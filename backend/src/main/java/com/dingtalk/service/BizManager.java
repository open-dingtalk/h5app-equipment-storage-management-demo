package com.dingtalk.service;

import com.alibaba.fastjson.JSONObject;
import com.aliyun.dingboot.common.token.ITokenManager;
import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.*;
import com.dingtalk.api.response.*;
import com.dingtalk.bo.JsApiTicketBo;
import com.dingtalk.config.AppConfig;
import com.dingtalk.util.DdConfigSign;
import com.taobao.api.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * 主业务service，编写你的代码
 */
@Slf4j
@Service
public class BizManager {

    private static final JsApiTicketBo JS_API_TICKET_BO = new JsApiTicketBo();

    @Autowired
    private ITokenManager tokenManager;

    @Autowired
    private AppConfig appConfig;

    public String hello() {
        return "HelloWorld";
    }

    /**
     * 获取JsApiTicket
     */
    public String getJsApiTicket() throws ApiException {
        String ticket = JS_API_TICKET_BO.getTicket();
        LocalDateTime deadline = JS_API_TICKET_BO.getDeadline();
        if (deadline != null && deadline.isAfter(LocalDateTime.now()) && StringUtils.isNotBlank(ticket)) {
            return ticket;
        }
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/get_jsapi_ticket");
        OapiGetJsapiTicketRequest request = new OapiGetJsapiTicketRequest();
        request.setHttpMethod("GET");
        OapiGetJsapiTicketResponse response = client.execute(request, accessToken);
        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("获取JsApiTicket失败: %s", res));
        }
        ticket = json.getString("ticket");
        deadline = LocalDateTime.now().plusMinutes(110L);
        JS_API_TICKET_BO.setTicket(ticket);
        JS_API_TICKET_BO.setDeadline(deadline);
        return ticket;
    }

    /**
     * 获取JsApi鉴权
     */
    public JSONObject getJsApiAuth(String url) throws Exception {
        String jsApiTicket = this.getJsApiTicket();
        long timeStamp = System.currentTimeMillis();
        String nonceStr = UUID.randomUUID().toString();
        String signature = DdConfigSign.sign(jsApiTicket, nonceStr, timeStamp, url);
        JSONObject json = new JSONObject();
        json.put("timeStamp", String.valueOf(timeStamp));
        json.put("nonceStr", nonceStr);
        json.put("signature", signature);
        return json;
    }

    /**
     * 获取部门用户基础信息
     */
    public JSONObject getDepartmentUserBasicInfo() throws ApiException {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/user/listsimple");
        OapiUserListsimpleRequest request = new OapiUserListsimpleRequest();
        request.setDeptId(1L);
        request.setCursor(0L);
        request.setSize(50L);
        request.setOrderField("modify_desc");
        request.setContainAccessLimit(false);
        request.setLanguage("zh_CN");
        OapiUserListsimpleResponse response = client.execute(request, accessToken);
        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("获取部门用户基础信息失败: %s", res));
        }
        return json.getJSONObject("result");
    }

    /**
     * 发送工作通知
     */
    public void sendWorkNotification(JSONObject params) throws ApiException {
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2");
        OapiMessageCorpconversationAsyncsendV2Request request = new OapiMessageCorpconversationAsyncsendV2Request();
        request.setAgentId(appConfig.getAgentId());
        request.setUseridList(params.getString("userIdList"));
        request.setToAllUser(false);

        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();
        msg.setMsgtype("text");
        msg.setText(new OapiMessageCorpconversationAsyncsendV2Request.Text());
        msg.getText().setContent(params.getString("content"));
        request.setMsg(msg);

        OapiMessageCorpconversationAsyncsendV2Response response = client.execute(request, accessToken);
        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("发送工作通知失败: %s", res));
        }
    }

    /**
     * 创建或更新审批模板
     */
    public JSONObject createOrUpdateApprovalTemplate(JSONObject params) throws ApiException {
        log.info("创建或更新审批模板 params: {}", params.toJSONString());
        JSONObject propParam = params.getJSONArray("props").getJSONObject(0);

        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());

        // 单行文本框
        OapiProcessSaveRequest.FormComponentPropVo singleInputProp = new OapiProcessSaveRequest.FormComponentPropVo();
        singleInputProp.setRequired(propParam.getBoolean("required"));
        //表单名称
        singleInputProp.setLabel(propParam.getString("label"));
        singleInputProp.setPlaceholder("请输入");
        //表单ID
        singleInputProp.setId(propParam.getString("id"));

        OapiProcessSaveRequest.FormComponentVo singleInput = new OapiProcessSaveRequest.FormComponentVo();
        //固定名称
        singleInput.setComponentName("TextField");
        singleInput.setProps(singleInputProp);

        List<OapiProcessSaveRequest.FormComponentVo> formComponentList = new ArrayList<>();
        formComponentList.add(singleInput);

        OapiProcessSaveRequest.SaveProcessRequest saveProcessRequest = new OapiProcessSaveRequest.SaveProcessRequest();
        saveProcessRequest.setDisableFormEdit(true);
        //审批模板名称
        saveProcessRequest.setName(params.getString("name"));
        //审批流的唯一码，有则更新，无则创建
        saveProcessRequest.setProcessCode(params.getString("processCode"));
        saveProcessRequest.setAgentid(appConfig.getAgentId());
        saveProcessRequest.setFakeMode(true);
        saveProcessRequest.setFormComponentList(formComponentList);

        OapiProcessSaveRequest request = new OapiProcessSaveRequest();
        request.setSaveProcessRequest(saveProcessRequest);

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/process/save");
        OapiProcessSaveResponse response = client.execute(request, accessToken);

        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("创建或更新审批模板 失败: %s", res));
        }
        log.info("创建或更新审批模板 result: {}", json.getJSONObject("result").toJSONString());
        return json.getJSONObject("result");
    }

    /**
     * 获取模板code
     */
    public JSONObject getTemplateCode(String name) throws ApiException {
        log.info("获取模板code params: {}", name);

        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());

        OapiProcessGetByNameRequest request = new OapiProcessGetByNameRequest();
        request.setName(name);

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/process/get_by_name");
        OapiProcessGetByNameResponse response = client.execute(request, accessToken);

        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("获取模板code 失败: %s", res));
        }
        log.info("获取模板code result: {}", json.toJSONString());
        return json;
    }

    /**
     * 创建实例
     */
    public JSONObject createInstance(JSONObject params) throws ApiException {
        log.info("创建实例 params: {}", params.toJSONString());
        JSONObject formComponentValueParam = params.getJSONArray("formComponentValues").getJSONObject(0);

        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());

        OapiProcessWorkrecordCreateRequest.FormComponentValueVo formComponentValue = new OapiProcessWorkrecordCreateRequest.FormComponentValueVo();
        //表单名称。表单每一栏的名称，对应表单组件的label字段。
        formComponentValue.setName(formComponentValueParam.getString("name"));
        //表单值
        formComponentValue.setValue(formComponentValueParam.getString("value"));

        List<OapiProcessWorkrecordCreateRequest.FormComponentValueVo> formComponentValues = new ArrayList<>();
        formComponentValues.add(formComponentValue);

        OapiProcessWorkrecordCreateRequest.SaveFakeProcessInstanceRequest instanceRequest = new OapiProcessWorkrecordCreateRequest.SaveFakeProcessInstanceRequest();
        instanceRequest.setAgentid(appConfig.getAgentId());
        //审批模板唯一码
        instanceRequest.setProcessCode(params.getString("processCode"));
        //审批实例接收人的user id
        instanceRequest.setOriginatorUserId(params.getString("originatorUserId"));
        //实例在审批应用里的跳转url，需要同时适配移动端和pc端。
        instanceRequest.setUrl(params.getString("url"));
        //实例标题
        instanceRequest.setTitle(params.getString("title"));
        instanceRequest.setFormComponentValues(formComponentValues);

        OapiProcessWorkrecordCreateRequest request = new OapiProcessWorkrecordCreateRequest();
        request.setRequest(instanceRequest);

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/process/workrecord/create");
        OapiProcessWorkrecordCreateResponse response = client.execute(request, accessToken);

        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("创建实例 失败: %s", res));
        }
        log.info("创建实例 result: {}", json.getJSONObject("result").toJSONString());
        return json.getJSONObject("result");
    }

    /**
     * 创建待办事项
     */
    public JSONObject createTodoItem(JSONObject params) throws ApiException {
        log.info("创建待办事项 params: {}", params.toJSONString());
        JSONObject taskParam = params.getJSONArray("tasks").getJSONObject(0);

        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());

        OapiProcessWorkrecordTaskCreateRequest.TaskTopVo task = new OapiProcessWorkrecordTaskCreateRequest.TaskTopVo();
        //待办事项执行人的userId
        task.setUserid(taskParam.getString("userId"));
        //待办事项跳转URL
        task.setUrl(taskParam.getString("url"));

        List<OapiProcessWorkrecordTaskCreateRequest.TaskTopVo> tasks = new ArrayList<>();
        tasks.add(task);

        OapiProcessWorkrecordTaskCreateRequest.SaveTaskRequest saveTaskRequest = new OapiProcessWorkrecordTaskCreateRequest.SaveTaskRequest();
        saveTaskRequest.setAgentid(appConfig.getAgentId());
        //审批实例ID
        saveTaskRequest.setProcessInstanceId(params.getString("processInstanceId"));
        //节点ID
        saveTaskRequest.setActivityId(params.getString("activityId"));
        saveTaskRequest.setTasks(tasks);

        OapiProcessWorkrecordTaskCreateRequest request = new OapiProcessWorkrecordTaskCreateRequest();
        request.setRequest(saveTaskRequest);

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/process/workrecord/task/create");
        OapiProcessWorkrecordTaskCreateResponse response = client.execute(request, accessToken);

        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("创建待办事项 失败: %s", res));
        }
        log.info("创建待办事项 result: {}", json.toJSONString());
        return json;
    }

    /**
     * 查询待办列表
     */
    public JSONObject queryTodoItem(JSONObject params) throws ApiException {
        log.info("查询待办列表 params: {}", params.toJSONString());
        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());

        OapiProcessWorkrecordTaskQueryRequest request = new OapiProcessWorkrecordTaskQueryRequest();
        //要查询的执行人userId
        request.setUserid(params.getString("userId"));
        //分页游标。支持分页查询，与count参数同时设置时才生效，此参数代表偏移量，偏移量从0开始。
        request.setOffset(params.getLong("offset"));
        //分页大小，最大50。
        request.setCount(params.getLong("count"));
        //待办事项的状态：0：待处理 -1：已经移除
        request.setStatus(params.getLong("status"));

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/process/workrecord/task/query");
        OapiProcessWorkrecordTaskQueryResponse response = client.execute(request, accessToken);

        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("查询待办列表 失败: %s", res));
        }
        log.info("查询待办列表 result: {}", json.getJSONObject("result").toJSONString());
        return json.getJSONObject("result");
    }

    /**
     * 更新待办状态
     */
    public JSONObject updateTodoStatus(JSONObject params) throws ApiException {
        log.info("更新待办状态 params: {}", params.toJSONString());
        JSONObject taskParam = params.getJSONArray("tasks").getJSONObject(0);

        String accessToken = tokenManager.getAccessToken(appConfig.getAppKey(), appConfig.getAppSecret());

        OapiProcessWorkrecordTaskUpdateRequest.TaskTopVo task = new OapiProcessWorkrecordTaskUpdateRequest.TaskTopVo();
        //待办任务ID
        task.setTaskId(taskParam.getLong("taskId"));
        //任务状态：CANCELED：取消 COMPLETED：完成
        task.setStatus(taskParam.getString("status"));
        //当status为COMPLETED时，必须指定任务结果：AGREE：同意 REFUSE：拒绝
        task.setResult(taskParam.getString("result"));

        List<OapiProcessWorkrecordTaskUpdateRequest.TaskTopVo> tasks = new ArrayList<>();
        tasks.add(task);

        OapiProcessWorkrecordTaskUpdateRequest.UpdateTaskRequest updateTaskRequest = new OapiProcessWorkrecordTaskUpdateRequest.UpdateTaskRequest();
        updateTaskRequest.setAgentid(appConfig.getAgentId());
        //实例ID
        updateTaskRequest.setProcessInstanceId(params.getString("processInstanceId"));
        updateTaskRequest.setTasks(tasks);

        OapiProcessWorkrecordTaskUpdateRequest request = new OapiProcessWorkrecordTaskUpdateRequest();
        request.setRequest(updateTaskRequest);

        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/process/workrecord/task/update");
        OapiProcessWorkrecordTaskUpdateResponse response = client.execute(request, accessToken);

        String res = response.getBody();
        JSONObject json = JSONObject.parseObject(res);
        Integer errCode = json.getInteger("errcode");
        if (!new Integer(0).equals(errCode)) {
            throw new RuntimeException(String.format("更新待办状态 失败: %s", res));
        }
        log.info("更新待办状态 result: {}", json.toJSONString());
        return json;
    }
}
