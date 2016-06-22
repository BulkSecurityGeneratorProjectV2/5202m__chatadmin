<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/common/common.jsp" %>
<script type="text/javascript" src="<%=request.getContextPath()%>/jsp/chat/showTrade.js" charset="UTF-8"></script>
<div id="editWindow" class="easyui-dialog" closed="true"></div>
<div class="easyui-layout" data-options="fit:true">
  <!-- notrh -->
   <div data-options="region:'north',border:false" style="height:120px;">
    <div class="easyui-panel" data-options="fit:true,title:'<spring:message code="common.searchCondition" />',border:false,iconCls:'pag-search'">
    <form class="yxForm" id="show_trade_queryForm">
      <table class="tableForm_L" style="margin-top:3px" width="99%" heigth="auto"  border="0" cellpadding="0" cellspacing="1">
        <tr>
          <th width="10%">房间组别</th>
			<td width="23%">
				<select name="groupType" id="showTrade_groupType_select" style="width: 160px;">
					<option value="">--请选择--</option>
					<c:forEach var="row" items="${chatGroupList}">
						<c:if test="${empty row.id}">
							<option value="${row.groupType }">
								${row.name}
							</option>
						</c:if>
					</c:forEach>
				</select>
		</td>
          <th width="10%">分析师账号--</th>
          <td width="23%">
          <!--  <input type="text" name="userNo" id="userNo" style="width:160px"/>-->
          
          <div id="selectUserArea">
	        <input type="hidden" name="userNo" id="userNo"/>
	        <input type="hidden" name="name" />
	        <input type="hidden" name="position" />
	        <input type="hidden" name="avatar" />
        	<select name="authorAvatar" style="width:280px;"></select>
          </div>
          
          </td>
          
        </tr>
       
        <tr>
          	<td colspan="4" align="right">&nbsp;&nbsp;
	        	<a href="#" class="easyui-linkbutton" id="show_trade_queryForm_search" data-options="iconCls:'ope-search'" ><spring:message code="common.buttons.search" /><!-- 查询 --> </a> 
	        	&nbsp;&nbsp; <a href="#" class="easyui-linkbutton" id="show_trade_queryForm_reset" data-options="iconCls:'ope-empty'" ><spring:message code="common.buttons.clear" /><!-- 清空 --> </a>
        	</td>
        </tr>
      </table>
    </form>
    </div>
  </div>
  
  <!-- datagrid -->
  <div data-options="region:'center',title:'<spring:message code="common.datalist" />',iconCls:'pag-list'">
    <div id="show_trade_datagrid" style="display:none"></div>
  </div>
  
   <!-- datagrid-toolbar -->
  <div id="show_trade_datagrid_toolbar">
    <a class="easyui-linkbutton add" data-options="plain:true,iconCls:'ope-add',disabled:false"  onclick="chatShowTrade.add();"><spring:message code="common.buttons.add" /><!-- 新增 --></a> 
    <a class="easyui-linkbutton delete" data-options="plain:true,iconCls:'ope-remove',disabled:false"    onclick="chatShowTrade.batchDel();"><spring:message code="common.buttons.delete" /><!-- 删除 --></a>
    <a class="easyui-linkbutton refresh" data-options="plain:true,iconCls:'ope-reload',disabled:false"   onclick="chatShowTrade.refresh();"><spring:message code="common.buttons.refresh" /><!-- 刷新 --></a> 
    <a class="easyui-linkbutton exitRoom" data-options="plain:true,iconCls:'ope-cancel',disabled:false"   onclick="chatShowTrade.exitChatRoom();">退出房间</a>
  </div> 
  
  <!-- datagrid-操作按钮 -->
  <div id="show_trade_datagrid_rowOperation">
	  <a class="easyui-linkbutton edit" data-options="plain:true,iconCls:'ope-edit',disabled:false"  onclick="chatShowTrade.edit(this.id)"><spring:message code="common.buttons.edit" /><!-- 修改 --></a>
	  <a class="easyui-linkbutton view" data-options="plain:true,iconCls:'ope-view',disabled:false" onclick="chatShowTrade.view(this.id)"><spring:message code="common.buttons.view" /><!-- 查看 --></a>
	  <a class="easyui-linkbutton resetPwd" data-options="plain:true,iconCls:'ope-redo',disabled:false" onclick="chatShowTrade.resetPwd(this.id)"><spring:message code="user.resetpwd" /><!-- 重设密码 --></a>
	  <a class="easyui-linkbutton delete" data-options="plain:true,iconCls:'ope-remove',disabled:false"  onclick="chatShowTrade.del(this.id)"><spring:message code="common.buttons.delete" /><!-- 删除 --></a>
  </div>
  
  <input style="display: none;" type="hidden" name="opType" id="userOpType" value="${opType }">
</div>