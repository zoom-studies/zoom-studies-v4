import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import Modal from 'react-modal';
import './containers.css';

Modal.setAppElement('#root');

class Questions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      instrRead: false,
      qualCheck: false,
      ratingsValues: {},
      // trapValues: 0, // if trapValues gets to 3, kick user
      qCount: 0
    };
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
    if (prevProps !== this.props) {
      this.setState({
        ratingsValues: {},
        qCount: 0
      });
    }
  }

  displayInstructions() {
    return(
      <div>
        <p>
          For this study, we are collecting data on the worker's experience of labeling data. Read each answer carefully before picking a label.
        </p>
        <p>
          After labeling, you will be asked to fill out two short surveys about your experience. You must complete all portions of the study to recieve compensation for the HIT.
        </p>
        <Button onClick={() => this.setState({instrRead:true})}>Accept</Button>
      </div>
    );
  }

  qualityCheck() {
    return(
      <div>
        <p>We are testing how the codebook provided affects your labeling experience. Read the guides for each label and use them when making rating decisions. Use the codebook instructions under the relevant tab to decide how to rate this answer to the question: </p>
        <h4>What is the most comfortable way to sleep on a plane?</h4>
        <p>The best way to improve sleep when on a plane is having head/neck support. Headrests on the seat sometimes fold inwards to support the head, or bring a neck pillow.</p>
        <ButtonGroup>
          <Button
            value="10"
            onClick={e => {this.setState({qualCheck:true});
                           e.target.blur();}}
          >
            Relevant
          </Button>
          <Button
            value="5"
            onClick={e => {this.setState({qualCheck:true, trapValues: 1});
                           e.target.blur();}}
          >
            Slightly Relevant
          </Button>
          <Button
            value="0"
            onClick={e => {this.setState({qualCheck:true, trapValues: 1});
                           e.target.blur();}}
          >
            Not Relevant
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  onRating = value => {
    console.log(value);
    const { qCount, ratingsValues } = this.state;
    const { onRatingComplete, questions } = this.props;

    // Trap question
    // const { docArray } = this.state;
    // let trapValues = this.state.trapValues;
    // if (docArray[qCount].value !== "") {
    //   if (docArray[qCount].value !== value) {
    //     trapValues += 1;
    //   }
    // }

    ratingsValues[questions[qCount].id] = value;

    this.setState({
      ratingsValues: ratingsValues,
      qCount: qCount + 1,
      // trapValues: trapValues,
    });

    if (this.state.qCount + 1 === questions.length) {
      onRatingComplete(ratingsValues);
    }
  }

  runTask() {
    const { questions } = this.props;
    const { instrRead, qCount } = this.state;

    // Instructions
    if (!instrRead) {
      return this.displayInstructions();
    }

    // Codebook reading test
    // const { qualCheck } = this.state;
    // const { tool } = this.props;
    // if (tool == 'codebook' && !qualCheck) {
    //   return this.qualityCheck();
    // }

    // Questions
    if (qCount < questions.length) {
      return(
        <div>
          <h4>What is the most comfortable way to sleep on a plane?</h4>
          <h6>Instructions: Rate the relevance of the answer below:</h6>
          <p
            dangerouslySetInnerHTML={ { __html: questions[qCount].text } }
            className="text-ctn fade-out"
          >
          </p>
          <ButtonGroup>
            <Button
              value="10"
              onClick={e => {this.onRating(10);
                             e.target.blur();}}
            >
              Relevant
            </Button>
            <Button
              value="5"
              onClick={e => {this.onRating(5);
                             e.target.blur();}}
            >
              Slightly Relevant
            </Button>
            <Button
              value="0"
              onClick={e => {this.onRating(0);
                             e.target.blur();}}
            >
              Not Relevant
            </Button>
          </ButtonGroup>
        </div>
      );
    } else {
      return (
        <div>
          <p>Questions Complete</p>
        </div>
      );
    }

  }

  render() {
    return (
      <div className="q-container" ref={this.mainRef}>
        { this.runTask() }
        <Modal
          isOpen={this.state.trapValues === 3}
          contentLabel="QualCheckFailed"
          shouldCloseOnOverlayClick={false}
        >
          <div>
          <p>Thank you for participating! However, you did not pass our quality checks and you cannot continue.</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Questions;
