import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import "../../ui/pages/main/welocomePage.js";
import "../../ui/pages/main/identity-reg.js";
import "../../ui/layouts/body/body.js"
FlowRouter.route('/', {
    name: 'welocomePage',
    action() {
      BlazeLayout.render('App_body', { main: 'welocomePage' });
    },
  });
FlowRouter.route('/identity-reg', {
    name: 'identity-reg',
    action() {
      BlazeLayout.render('App_body', { main: 'identity-reg' });
    },
  });
  