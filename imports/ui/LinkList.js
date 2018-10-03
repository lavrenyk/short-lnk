import { Meteor } from 'meteor/meteor';
import React from "react";
import FlipMove from 'react-flip-move';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem'; 

export default class LinkList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    links: []
    }
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    });

    this.visibilityTracker = Tracker.autorun(() => {
      this.linkVisibility = Session.get('linkVisibility');
    });
  }

  componentWillUnmount() {
    console.log("ComponentWillUnmount");
    this.linksTracker.stop();
  }

  renderLinkListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links Found!</p>
        </div>
      );
    }
    
    return this.state.links.map((link) => {
      const shortUtl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUtl} {...link} />
    });
  }

  render() {
    return (
      <div>
        <div>
          <FlipMove maintainContainerHeight={true}>
          {this.renderLinkListItems()}
          </FlipMove>
        </div>

      </div>
    );
  }
};