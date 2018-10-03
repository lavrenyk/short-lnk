import React from "react";

import LinkList from './LinkList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilter from './LinkListFilter';

export default () => {
  return (
    <div>
      <PrivateHeader title='Your links'/>
      <div className="page-content">
        <LinksListFilter />
        <AddLink />
        <LinkList />
      </div>
      
    </div>
  );
}