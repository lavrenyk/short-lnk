import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, browserHistory } from "react-router";

import Login from "../ui/Login";
import Signup from "../ui/Singup";
import Link from "../ui/Link";
import NotFound from "../ui/NotFound";

// константы с описанием путей публичных и закрытых страниц
const unathenticatePages = ['/', '/signup'];
const athenticatePages = ['/links'];

// перенаправляем зарегистрированного пользователя в нужное место
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
};

// проверяем попытку зайти неавторизованному пользователю в закрытую зону
const onEnterPrivatePages = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
}

// отслеживаем статус пользователя и при необходимости отправляем его в нужное место
export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnathenticatedPage = unathenticatePages.includes(pathname);
    const isAthenticatedPage = athenticatePages.includes(pathname);
    
    if (isAuthenticated && isUnathenticatedPage) {
      browserHistory.replace('/links');    
    } else if (!isAuthenticated && isAthenticatedPage) {
      browserHistory.replace('/');
    } 
};

// определяем пути и соответсвующие им компаненты
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="links" component={Link} onEnter={onEnterPrivatePages} />
    <Route path="*" component={NotFound}/>
  </Router>
);