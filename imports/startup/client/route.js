import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import "../../ui/pages/main/welocomePage.js";
import "../../ui/pages/main/identity-reg.js";
import "../../ui/layouts/body/body.js"
import "../../ui/pages/main/proposal.js";
import "../../ui/pages/main/Registered.js";
import "../../ui/pages/main/Voting.js";
import "../../ui/pages/main/citizenship.js"
import "../../ui/pages/main/newproposal.js";
import "../../ui/pages/main/result.js";

FlowRouter.route('/', {
  name: 'welocomePage',
  action() {
    BlazeLayout.render('App_body', { main: 'welcomePage' });
  }
});
FlowRouter.route('/vote/:id', {
  name: 'Vote',
  action(params) {
    var cont=params.id;
    console.log("---",params.id);
    BlazeLayout.render('App_body', { main: 'Vote' ,id:cont});
  }
});

FlowRouter.route('/identity-reg', {
  name: 'identity-reg',
  action() {
    BlazeLayout.render('App_body', { main: 'identity_reg'});
  }
});

FlowRouter.route('/reg-success', {
  name: 'Reg-success',
  action() {
    BlazeLayout.render('App_body', { main: 'Reg_success' });
  }
});
FlowRouter.route('/proposal', {
  name: "proposal-page",
  action(){
    BlazeLayout.render('App_body', { main: 'App_proposal'});
  }
});
FlowRouter.route('/citizenship', {
  name: "citizenship",
  action(){
    BlazeLayout.render('App_body', { main: 'citizenship'});
  }
});

FlowRouter.route('/newproposal', {
  name: "newproposal",
  action(){
    BlazeLayout.render('App_body', { main: 'App_newproposal'});
  }
});

FlowRouter.route('/result', {
  name: "result",
  action(){
    BlazeLayout.render('App_body', { main: 'App_result'});
  }
});