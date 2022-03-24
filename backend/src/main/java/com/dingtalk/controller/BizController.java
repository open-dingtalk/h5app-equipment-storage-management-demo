package com.dingtalk.controller;

import com.alibaba.fastjson.JSONObject;
import com.dingtalk.config.AppConfig;
import com.dingtalk.model.RpcServiceResult;
import com.dingtalk.service.BizManager;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 主业务Controller，编写你的代码
 */
@Slf4j
@RestController
@RequestMapping("/biz")
public class BizController {

    @Autowired
    BizManager bizManager;

    @Autowired
    private AppConfig appConfig;

    @RequestMapping("/hello")
    public RpcServiceResult hello() {
        String hello = bizManager.hello();
        if (StringUtils.isEmpty(hello)) {
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
        return RpcServiceResult.getSuccessResult(hello);
    }

    /**
     * 获取JsApi鉴权
     *
     * @param url url
     */
    @PostMapping("/getJsApiAuth")
    public RpcServiceResult getJsApiAuth(@RequestBody JSONObject params) {
        try {
            JSONObject json = bizManager.getJsApiAuth(params.getString("url"));
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 获取部门用户基础信息
     */
    @PostMapping("/getDepartmentUserBasicInfo")
    public RpcServiceResult getDepartmentUserBasicInfo() {
        try {
            JSONObject json = bizManager.getDepartmentUserBasicInfo();
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 发送工作通知
     *
     * @param userIdList 用户id列表
     * @param content    内容
     */
    @PostMapping("/sendWorkNotification")
    public RpcServiceResult sendWorkNotification(@RequestBody JSONObject params) {
        try {
            bizManager.sendWorkNotification(params);
            return RpcServiceResult.getSuccessResult(null);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 获取钉钉秘钥
     */
    @PostMapping("/getDingSecretKey")
    public RpcServiceResult getDingSecretKey() {
        try {
            JSONObject json = new JSONObject();
            json.put("appKey", appConfig.getAppKey());
            json.put("appSecret", appConfig.getAppSecret());
            json.put("corpId", appConfig.getCorpId());
            json.put("agentId", appConfig.getAgentId());
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 创建或更新审批模板
     */
    @PostMapping("/createOrUpdateApprovalTemplate")
    public RpcServiceResult createOrUpdateApprovalTemplate(@RequestBody JSONObject params) {
        /*
        {
            "name": "审批模板名称",
            "processCode": "审批流的唯一码，有则更新，无则创建",
            //只传一个数组对象
            "props": [{
                "id": "表单ID",
                "label": "表单名称",
                "required": true/false
            }]
        }
        */
        try {
            JSONObject json = bizManager.createOrUpdateApprovalTemplate(params);
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 获取模板code
     */
    @GetMapping("/getTemplateCode")
    public RpcServiceResult getTemplateCode(String name) {
        try {
            JSONObject json = bizManager.getTemplateCode(name);
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 创建实例
     */
    @PostMapping("/createInstance")
    public RpcServiceResult createInstance(@RequestBody JSONObject params) {
        /*
        {
            "title": "实例标题",
            "url": "实例在审批应用里的跳转url，需要同时适配移动端和pc端。",
            "originatorUserId": "审批实例接收人的user id",
            "processCode": "审批模板唯一码",
            //只传一个数组对象
            "formComponentValues": [{
                "name": "表单名称。表单每一栏的名称，对应表单组件的label字段。",
                "value": "表单值。"
            }]
        }
        */
        try {
            JSONObject json = bizManager.createInstance(params);
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 创建待办事项
     */
    @PostMapping("/createTodoItem")
    public RpcServiceResult createTodoItem(@RequestBody JSONObject params) {
        /*
        {
            "processInstanceId": "审批实例ID",
            "activityId": "节点ID",
            //只传一个数组对象
            "tasks": [{
                "userId": "待办事项执行人的userId",
                "url": "待办事项跳转URL"
            }]
        }
        */
        try {
            JSONObject json = bizManager.createTodoItem(params);
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 查询待办列表
     */
    @PostMapping("/queryTodoItem")
    public RpcServiceResult queryTodoItem(@RequestBody JSONObject params) {
        /*
        {
            "userId": "要查询的执行人userId",
            "offset": "分页游标。支持分页查询，与count参数同时设置时才生效，此参数代表偏移量，偏移量从0开始。",
            "count": "分页大小，最大50",
            "status": "待办事项的状态：0：待处理 -1：已经移除"
        }
        */
        try {
            JSONObject json = bizManager.queryTodoItem(params);
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }

    /**
     * 更新待办状态
     */
    @PostMapping("/updateTodoStatus")
    public RpcServiceResult updateTodoStatus(@RequestBody JSONObject params) {
        /*
        {
            "processInstanceId": "实例ID",
            //只传一个数组对象
            "tasks": [{
                "taskId": "待办任务ID",
                "status": "任务状态：CANCELED：取消 COMPLETED：完成",
                "result": "当status为COMPLETED时，必须指定任务结果：AGREE：同意 REFUSE：拒绝"
            }]
        }
        */
        try {
            JSONObject json = bizManager.updateTodoStatus(params);
            return RpcServiceResult.getSuccessResult(json);
        } catch (Exception e) {
            log.error("", e);
            return RpcServiceResult.getFailureResult("-1", "fail");
        }
    }
}
