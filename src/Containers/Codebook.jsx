import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardHeader, CardText, CardBody, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './containers.css';

class Codebook extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      activeTab: 'rel',
    };
  }

  toggle = tab => {
    if(this.state.activeTab !== tab) this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab } = this.state;

    return (
      <Card>
        <CardHeader>Codebook</CardHeader>
        <CardBody>
          <CardText>Prioritize answers that focus on getting to sleep. Answers that focus on planes should be considered most relevant, but answers that cover similar situations may also be considered.</CardText>
        </CardBody>
        <Nav tabs justified>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'rel' })}
              onClick={() => { this.toggle('rel'); }}
            >
              Relevant
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'slightly' })}
              onClick={() => { this.toggle('slightly'); }}
            >
              Slightly Relevant
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'not' })}
              onClick={() => { this.toggle('not'); }}
            >
              Not Relevant
            </NavLink>
          </NavItem>
        </Nav>
        <CardBody>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="rel">
              <Row>
                <Col sm="12">
                  <p>Relevant answers should <u>fully</u> answer the question; be clear, consise, and objective; and be concerned with the specific situation described in the question.</p>
                  <h6>Inclusion Criteria:</h6>
                  <ul>
                    <li><span role="img" aria-label="check">✅</span> Answers about sleeping on commercial flights</li>
                    <li><span role="img" aria-label="check">✅</span> Answers that establish credible sources</li>
                    <li><span role="img" aria-label="check">✅</span> Answers that are well organized</li>
                    <li><span role="img" aria-label="check">✅</span> Answers that may have a variety of perspectives or alternative solutions</li>
                  </ul>
                  <h6>Exclusion Criteria:</h6>
                  <ul>
                    <li><span role="img" aria-label="cross">❌</span> Answers that discuss crew/non-passenger sleeping arrangements</li>
                    <li><span role="img" aria-label="cross">❌</span> Answers that lack enough detail to clarify their points</li>
                    <li><span role="img" aria-label="cross">❌</span> Answers that are indirect or rambling</li>
                  </ul>
                  <hr></hr>
                  <h6>Example:</h6>
                  <p>"The best way to improve sleep when on a plane is having head/neck support."</p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="slightly">
              <Row>
                <Col sm="12">
                  <p>Slightly relevant answers are <u>partially</u> applicable to the question. They may not be detailed enough or lack specificity to this question, but still contain potentially useful information.</p>
                  <h6>Inclusion Criteria:</h6>
                  <ul>
                    <li><span role="img" aria-label="check">✅</span> Answers that do not fully meet the criteria of the relevent label</li>
                    <li><span role="img" aria-label="check">✅</span> Answers about sleeping not specific to planes, or if specific to other locations (trains/airports/etc), could still be utilized on a plane</li>
                    <li><span role="img" aria-label="check">✅</span> Answers that apply only to specific types of people</li>
                    <li><span role="img" aria-label="check">✅</span> Answers that expand on someone else's thoughts</li>
                  </ul>
                  <h6>Exclusion Criteria:</h6>
                  <ul>
                    <li><span role="img" aria-label="cross">❌</span> Answers that are well explained and useful to the question</li>
                    <li><span role="img" aria-label="cross">❌</span> Answers that are not clear or are too rambling</li>
                  </ul>
                  <hr></hr>
                  <h6>Example:</h6>
                  <p>"Some trains are cold, so a warm thin blanket will be much more comfortable"</p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="not">
              <Row>
                <Col sm="12">
                  <p>Not relevant answers <u>do not</u> answer the question, contain incorrect or misleading answers, or may inadequately explain to a point that the answer cannot be considered useful.</p>
                  <h6>Inclusion Criteria:</h6>
                  <ul>
                    <li><span role="img" aria-label="check">✅</span> Answers not about sleeping at all, or about sleeping issue that can't be even partically related to sleeping on a plane (e.g. jet-lag)</li>
                    <li><span role="img" aria-label="check">✅</span> Answers that are too short</li>
                    <li><span role="img" aria-label="check">✅</span> Answers that raise new questions</li>
                  </ul>
                  <h6>Exclusion Criteria:</h6>
                  <ul>
                    <li><span role="img" aria-label="cross">❌</span> Answers that can still be useful to the question should only be marked 'not relevant' if they do not sufficently meet the 'slightly relevant' criteria</li>
                  </ul>
                  <hr></hr>
                  <h6>Example:</h6>
                  <p>"I'm currently in Istanbul but will soon head west to the Romania/Bulgaria border (hitchhiking) and intend to buy a cheap tent and sleeping bag on the way."</p>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    );
  }
}

export default Codebook;

// import React, { useState } from 'react';
// import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
// import classnames from 'classnames';
//
// const Example = (props) => {
//   const [activeTab, setActiveTab] = useState('1');
//
//   const toggle = tab => {
//     if(activeTab !== tab) setActiveTab(tab);
//   }
//
//   return (
//     <div>
//       <Nav tabs>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === '1' })}
//             onClick={() => { toggle('1'); }}
//           >
//             Tab1
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === '2' })}
//             onClick={() => { toggle('2'); }}
//           >
//             More Tabs
//           </NavLink>
//         </NavItem>
//       </Nav>
//       <TabContent activeTab={activeTab}>
//         <TabPane tabId="1">
//           <Row>
//             <Col sm="12">
//               <h4>Tab 1 Contents</h4>
//             </Col>
//           </Row>
//         </TabPane>
//         <TabPane tabId="2">
//           <Row>
//             <Col sm="6">
//               <Card body>
//                 <CardTitle>Special Title Treatment</CardTitle>
//                 <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
//                 <Button>Go somewhere</Button>
//               </Card>
//             </Col>
//             <Col sm="6">
//               <Card body>
//                 <CardTitle>Special Title Treatment</CardTitle>
//                 <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
//                 <Button>Go somewhere</Button>
//               </Card>
//             </Col>
//           </Row>
//         </TabPane>
//       </TabContent>
//     </div>
//   );
// }
//
// export default Example;
