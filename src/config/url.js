var END_POINT_2 = 'http://vspace.in.th/apis/';
var Url = {
  'info':END_POINT_2+"v1/user/header",
  'projectDetail':END_POINT_2+"v1/projectplan/projectdetail",
  'listCaseAll':END_POINT_2+"v1/casetype/listCaseAll",
  'project':END_POINT_2+"v1/projectplan/projectlist",
  'login':END_POINT_2+'v1/user/login',
  'editOwnerCase':END_POINT_2+'v1/casemodify/owner',
  'casemodifySubject':END_POINT_2+'v1/casemodify/subject',
  'caseCreate':END_POINT_2+'v1/casemanagement/createCasesProjectPlan',
  'caseRemove':END_POINT_2+'v1/casemodify/removeCase',
  'findContractInfo': END_POINT_2+'v1/contract/find_contract_info',
  'projectCreate': END_POINT_2+'v1/project/ProjectCreate',
  'addProjectContact': END_POINT_2+'v1/projectmodify/addProjectContact',
  'serviceReportCreate': END_POINT_2+'v1/incident/createServiceReportReact',
  'signup':END_POINT_2+'v1/user/signupReact',
  'signupConfirm':END_POINT_2+'v1/user/comfirmOtpReact',
  'forgotPassword':END_POINT_2+'v1/user/forgotPasswordReact',
  'confirmForgotPassword':END_POINT_2+'v1/user/confirmForgotPasswordReact',
  'projectAddStaff':END_POINT_2+'v1/projectmodify/addStaff',
  'projectDeleteStaff':END_POINT_2+'v1/projectmodify/deleteStaff',
  'changeMandaysCase':END_POINT_2+'v1/casemodify/mandays',
  'inviteEmail':END_POINT_2+'v1/sendmail/inviteMember',
  'ticket':END_POINT_2+'v1/incident/lists',
  'addChecklist':END_POINT_2+"v1/projectplan/addChecklist",
  'removeChecklist':END_POINT_2+"v1/projectplan/removeChecklist",
  'doChecklist':END_POINT_2+"v1/projectplan/doChecklist",
  'removeChecklist':END_POINT_2+"v1/projectplan/removeChecklist",
  'updateChecklist':END_POINT_2+"v1/projectplan/updateChecklist",
  'appointment':END_POINT_2+"v1/servicereport/appointment",
  'checkpoint':END_POINT_2+"v1/timestampSr"
}

export default Url;
