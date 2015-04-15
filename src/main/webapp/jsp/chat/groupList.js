/**
 * 聊天室组别管理列表js
 * @author alan.wu
 * @date   2015/03/19
 */
var chatGroup = {
	ruleComboxData:null,
	gridId : 'chatGroup_datagrid',
	init : function(){
		this.intRuleCombox();
		this.initGrid();
		this.setEvent();
	},
	/**
	 * 初始化规则下拉框
	 */
	intRuleCombox:function(){
		var data=getJson(basePath +"/chatGroupRuleController/getGroupRuleCombox.do");
		chatGroup.ruleComboxData=data;
		//设置链接规则的下拉框
		$("#chatHomeUrlRuleId").combotree({
			editable:true,
		    data:data
		}); 
		//设置内容规则的下拉框
		$("#chatContentRuleIds").combotree({
		    data:data
		}); 
	},
	/**
	 * 功能：dataGrid初始化
	 */
	initGrid : function(){
		goldOfficeUtils.dataGrid({
			gridId : chatGroup.gridId,
			idField : 'id',
			sortName : 'id',
			sortOrder : 'desc',
			singleSelect : false,
			url : basePath+'/chatGroupController/datagrid.do',
			columns : [[
			            {title : 'id',field : 'id',checkbox : true},
			            {title : $.i18n.prop("common.operate"),field : 'todo',formatter : function(value, rowData, rowIndex) {		/**操作*/
							$("#chatGroup_datagrid_rowOperation a").each(function(){
								$(this).attr("id",rowData.id);
						    });
							return $("#chatGroup_datagrid_rowOperation").html();
						}},
			            {title : '编号',field : 'idStr',formatter : function(value, rowData, rowIndex) {
							return rowData.id;
						}},
						{title : '名称',field : 'name'},
						{title : '状态',field : 'statusName',formatter : function(value, rowData, rowIndex) {
							return chatGroup.getStatusNameByCode(rowData.status);
						}},
						{title : '主页连接规则',field : 'homeRuleName',formatter : function(value, rowData, rowIndex) {
							return rowData.homeUrlRule.name;
						}},
						{title : '聊天内容规则',field : 'contentRuleName',formatter : function(value, rowData, rowIndex) {
							var contentRules=rowData.contentRules,result=[];
							if(contentRules==null){
								return "";
							}
							for(var index in contentRules){
								result.push(contentRules[index].name);
							}
							return result.join("，");
						}},
						{title : '创建人',field : 'createUser'},
						{title : '创建时间',field : 'createDate',sortable : true,formatter : function(value, rowData, rowIndex) {
							return value ? timeObjectUtil.longMsTimeConvertToDateTime(value) : '';
						}},
						{title : '修改人',field : 'updateUser'},
						{title : '修改时间',field : 'updateDate',sortable : true,formatter : function(value, rowData, rowIndex) {
							return value ? timeObjectUtil.longMsTimeConvertToDateTime(value) : '';
						}}
						
			]],
			toolbar : '#chatGroup_datagrid_toolbar'
		});
	},
	/**
	 * 提取规则名称
	 */
	getStatusNameByCode:function(code){
		return $("#chatGroupStatus").find("option[value='"+code+"']").text();
	},
	setEvent:function(){
		// 列表查询
		$("#chatGroup_queryForm_search").on("click",function(){
			var queryParams = $('#'+chatGroup.gridId).datagrid('options').queryParams;
			chatGroup.clearQueryParams(queryParams);
			$("#chatGroup_queryForm input[name],#chatGroup_queryForm select[name]").each(function(){
				var qp=queryParams[this.name];
				if(isValid(qp)){
					queryParams[this.name]+=(","+$(this).val());
				}else{
					queryParams[this.name] = $(this).val();
				}
			});
			$('#'+chatGroup.gridId).datagrid({
				url : basePath+'/chatGroupController/datagrid.do',
				pageNumber : 1
			});
		});
		// 重置
		$("#chatGroup_queryForm_reset").on("click",function(){
			$("#chatGroup_queryForm")[0].reset();
		});
	},
	/**
	 * 清空旧的参数
	 */
	clearQueryParams:function(queryParams){
		$("#chatGroup_queryForm input[name],#chatGroup_queryForm select[name]").each(function(){
			queryParams[this.name] = "";
		});
	},
	/**
	 * 功能：增加
	 */
	add : function(){
		var url = formatUrl(basePath + '/chatGroupController/add.do');
		var submitUrl =  formatUrl(basePath + '/chatGroupController/create.do');
		goldOfficeUtils.openEditorDialog({
			title : $.i18n.prop("common.operatetitle.add"),			/**添加记录*/
			height : 190,
			href : url,
			iconCls : 'pag-add',
			handler : function(){   //提交时处理
				if($("#chatGroupSubmitForm").form('validate')){
					goldOfficeUtils.ajaxSubmitForm({
						url : submitUrl,
						formId : 'chatGroupSubmitForm',
						onSuccess : function(data){  //提交成功后处理
							var d = $.parseJSON(data);
							if (d.success) {
								// 提交成功后先关闭弹出框,然后刷新表格,弹出对应的成功提示
								$("#myWindow").dialog("close");
								chatGroup.refresh();
								$.messager.alert($.i18n.prop("common.operate.tips"),'操作成功！','info');
							}else{
								$.messager.alert($.i18n.prop("common.operate.tips"),'新增失败，原因：'+d.msg,'error');	/**操作提示 新增失败!*/
							}
						}
					});
				}
			}
		});
	},
	/**
	 * 功能：修改
	 * @param recordId   dataGrid行Id
	 */
	edit : function(recordId){
		$("#system_user_datagrid").datagrid('unselectAll');
		var url = formatUrl(basePath + '/chatGroupController/'+recordId+'/edit.do');
		var submitUrl =  formatUrl(basePath + '/chatGroupController/update.do');
		goldOfficeUtils.openEditorDialog({
			title : $.i18n.prop("common.operatetitle.edit"),   /**修改记录*/
			height : 190,
			href : url,
			iconCls : 'pag-edit',
			handler : function(){    //提交时处理
				if($("#chatGroupSubmitForm").form('validate')){
					goldOfficeUtils.ajaxSubmitForm({
						url : submitUrl,
						formId : 'chatGroupSubmitForm',
						onSuccess : function(data){   //提交成功后处理
							var d = $.parseJSON(data);
							if (d.success) {
								$("#myWindow").dialog("close");
								chatGroup.refresh();
								$.messager.alert($.i18n.prop("common.operate.tips"),$.i18n.prop("common.editsuccess"),'info');/**操作提示  修改成功!*/
							}else{
								$.messager.alert($.i18n.prop("common.operate.tips"),'修改失败，原因：'+d.msg,'error');  /**操作提示  修改失败!*/
							}
						}
					});
				}
			}
		});
	},
	/**
	 * 功能：刷新
	 */
	refresh : function(){
		$('#'+chatGroup.gridId).datagrid('reload');
	},
	/**
	 * 功能：批量删除
	 */
	batchDel : function(){
		var url = formatUrl(basePath + '/chatGroupController/del.do');
		goldOfficeUtils.deleteBatch('chatGroup_datagrid',url);	
	},
	/**
	 * 功能：删除单行
	 * @param recordId  dataGrid行Id
	 */
	del : function(recordId){
		$("#chatGroup_datagrid").datagrid('unselectAll');
		var url = formatUrl(basePath + '/chatGroupController/del.do');
		goldOfficeUtils.deleteOne('chatGroup_datagrid',recordId,url);
	}
};
		
//初始化
$(function() {
	chatGroup.init();
});