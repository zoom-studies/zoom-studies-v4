import React, { Component } from 'react';
import Modal from 'react-modal'; // http://reactcommunity.org/react-modal/
import { Container, Row, Col, Button } from 'reactstrap';
import './App.css';
import Codebook from './Containers/Codebook';
import Questions from './Containers/Questions';
import Surveys from './Containers/Surveys';
import DocsFile from './docs.json';

Modal.setAppElement('#root');

class App extends Component {

  constructor(props) {
    super(props);

    const docArray = DocsFile.docs;
    const questions = {
      'codebook': docArray.slice(docArray.length / 2, docArray.length),
      'control': docArray.slice(0, docArray.length / 2)
    };

    this.state = {
      uID: 0,
      workerID: 0,
      completeCode: 0,
      questions: questions,
      tool: Object.keys(questions)[0],
      numQuestionsCompleted: 0,
      consentSigned: false,
      questionsComplete: false,
      tlxComplete: false,
      elabComplete: false,
      susComplete: false,
      experimentComplete: false,
      ratingsValues: {},
      tlxResults: {},
      elabResults:{},
      susResults: {}
    };

    this.finishExperiment = this.finishExperiment.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let foo = params.get('workerID');
    console.log(foo);
    if (foo) {
      this.setState({
        workerID: foo,
      });
    }
    this.runExperiment();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)

    const { questionsComplete, tlxComplete, elabComplete, susComplete, experimentComplete } = this.state;
    const roundComplete = questionsComplete && tlxComplete && elabComplete && susComplete;
    if (roundComplete && !experimentComplete) {
      this.submit();
    }
  }

  runExperiment() {
    //Calc u_id
    const uID = Math.floor((Math.random() * 999999) + 10000);

    //Calc condition
    this.setState({
      uID: uID,
    });
  }

  signConsent() {
    this.setState({
      consentSigned: true
    });
  }

  onRatingComplete  = ratingsValues => {
    const { numQuestionsCompleted } = this.state;
    this.setState(
      {
        ratingsValues: ratingsValues,
        questionsComplete: true,
        numQuestionsCompleted: numQuestionsCompleted + Object.keys(ratingsValues).length
      },
      () => { console.log(this.state.ratingsValues); }
    );
  }

  onTLXSubmit = (tlxValues) => {
    this.setState({
      tlxResults: tlxValues,
      tlxComplete: true,
    });
  }

  onElabSubmit = (elabValues) => {
    this.setState({
      elabResults: elabValues,
      elabComplete: true,
    });
  }

  onSusSubmit = (susValues) => {
    this.setState({
      susResults: susValues,
      susComplete: true,
    })
  }

  finishExperiment() {
    console.log("finishexperiment");
    const { workerID, uID, consentSigned } = this.state;

    //generate completion code
    const code = Math.floor((Math.random() * 99999) + 10000);
    const sheet0row = {Worker_ID: workerID,	u_ID: uID, starts_with: 'codebook', consent_signed: consentSigned,	generated_code: code};

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ consent_with_multiple_conditions: sheet0row })
    };

    fetch('https://script.google.com/macros/s/AKfycbysvtxKlgBzNE1m-1zxeKrzp0t2vozOo8jWN9c34MxWLKTfSQ9q13NFM0smrAc3VqmX/exec', requestOptions)
        .then(response => {
          console.log(response);
          this.setState({
            experimentComplete: true,
            completeCode: code,
          });
        })
        .catch(error => console.log(error));
  }

  submit() {
    const {uID, tool, questions, numQuestionsCompleted, ratingsValues, tlxResults, elabResults, susResults} = this.state;

    //append data
    const resultsRow = {u_ID: uID, condition: tool,	...ratingsValues};
    console.log(resultsRow);
    const tlxRow = {u_ID: uID, condition: tool,	...tlxResults};
    const elabRow = {u_ID: uID, condition: tool, ...elabResults};
    const susRow = {u_ID: uID, condition: tool, ...susResults}

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ ratings_with_multiple_conditions: resultsRow,
                             tlx_answers_with_multiple_conditions: tlxRow,
                             elab_answers_with_multiple_conditions: elabRow,
                             sus_answers_with_multiple_conditions: susRow })
    };
    fetch('https://script.google.com/macros/s/AKfycbysvtxKlgBzNE1m-1zxeKrzp0t2vozOo8jWN9c34MxWLKTfSQ9q13NFM0smrAc3VqmX/exec', requestOptions)
        .then(response => {
          console.log(response);
          if (numQuestionsCompleted === DocsFile.docs.length) {
            this.finishExperiment();
          } else {
            const newToolIndex = Object.keys(questions).indexOf(tool) + 1;
            this.setState({
              questionsComplete: false,
              tlxComplete: false,
              elabComplete: false,
              susComplete: false,
              ratingsValues: {},
              tlxResults: {},
              elabResults: {},
              susResults: {},
              tool: Object.keys(questions)[newToolIndex]
            });
          }
        })
        .catch(error => console.log(error));
  }

  render() {
    const { consentSigned,
            questions,
            tool,
            questionsComplete,
            tlxComplete,
            elabComplete,
            susComplete,
            experimentComplete,
            numQuestionsCompleted } = this.state;

    return (
      <div className="App">
        <Modal
          isOpen={!consentSigned}
          onRequestClose={this.signConsent}
          contentLabel="Consent Form"
          shouldCloseOnOverlayClick={false}
        >
          <div>
          <p>You are being asked to complete a study for research purposes. The study is testing how data collection is affected by the use of additional tooling to assist workers. Completing this study is voluntary and you can stop at any time by closing this window.</p>
          <p>You must be 18 years of age or older to participate in this study.</p>
          <p>There are minimal risks associated with your participation in this study. You will receive $5 for completing this study. In order to receive full compensation for completing the study, you must complete all parts of the study and pass all attention checks, then enter the provided random number code into the MTurk HIT window.</p>
          <p>Please note that because you are participating in this research via MTurk, your participation will be listed on your MTurk profile. However, MTurk will not have access to your responses on the survey. Further, while we will have access to your MTurk ID, we will only use this information to pay you and then your ID will be deleted from our records and will no longer be associated with your responses.</p>
          <p>If you have any questions about the study itself, how it is implemented, or study compensation, please contact J Christensen at jtchrist@ncsu.edu or B Watson at bwatson@ncsu.edu . Please reference study number 16906 when contacting anyone about this project.</p>
          <p>If you have questions about your rights as a participant or are concerned with your treatment throughout the research process, please contact the NC State University IRB Director at IRB-Director@ncsu.edu, 919-515-8754, or fill out this confidential form online.</p>
          <p>If you consent to complete this survey, please click the "Yes I consent" button to continue.</p>
          </div>
          <Button onClick={() => this.signConsent()}>Yes, I consent</Button>
        </Modal>
        <Container className="App-body">
          <Row>
            { tool === 'codebook' &&
              <Col className="cb-col">
                <Codebook />
              </Col>
            }
            <Col className="p-4">
              <Questions
                onRatingComplete={this.onRatingComplete}
                questions={questions[tool]}
                numQuestionsCompleted={numQuestionsCompleted}
              />
            </Col>
          </Row>
        </Container>
        <Modal
          isOpen={questionsComplete}
          contentLabel="Surveys"
          shouldCloseOnOverlayClick={false}
        >
          <Surveys
            onTLXSubmit={this.onTLXSubmit}
            onElabSubmit={this.onElabSubmit}
            onSusSubmit={this.onSusSubmit}
            tlxComplete={tlxComplete}
            elabComplete={elabComplete}
            susComplete={susComplete}
            numQuestionsCompleted={numQuestionsCompleted}
          />
        </Modal>
        <Modal
          isOpen={questionsComplete && tlxComplete && elabComplete && susComplete && numQuestionsCompleted === DocsFile.docs.length}
          contentLabel="CompletionCode"
          shouldCloseOnOverlayClick={false}
        >
          { experimentComplete
            ? (
              <div>
              <p>Thank you for participating! Your completion code is:</p>
              <p><b>{this.state.completeCode}</b></p>
              </div>
            )
            : (
              <div>
              <p>Generating completion code. Please wait.</p>
              </div>
            )
          }
        </Modal>
      </div>
    );
  }
}

export default App;
