import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Form,
  Segment,
  Input,
  Button,
  Header,
  Table,
  Icon,
} from 'semantic-ui-react';
import firebase from './firebase';

const FirebaseCrud = () => {
  // add state to add and update learners
  const [addFirstName, setAddFirstName] = useState('');
  const [addLastName, setAddLastName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addScore, setAddScore] = useState('');
  const [learnerData, setLearnerData] = useState([]);
  const [updateFirstName, setUpdateFirstName] = useState('');
  const [updateLastName, setUpdateLastName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateScore, setUpdateScore] = useState('');
  const [learnerId, setLearnerId] = useState('');

  useEffect(() => {
    const firestore = firebase.database().ref('/learners');
    firestore.on('value', (response) => {
      const data = response.val();
      let learnerInfo = [];
      for (let id in data) {
        learnerInfo.push({
          id: id,
          firstName: data[id].firstName,
          lastName: data[id].lastName,
          email: data[id].email,
          score: data[id].score,
        });
      }
      setLearnerData(learnerInfo);
    });
  }, []);

  const addLearnerHandler = () => {
    const firestore = firebase.database().ref('/learners');
    let data = {
      firstName: addFirstName,
      lastName: addLastName,
      email: addEmail,
      score: addScore,
    };
    firestore.push(data);
    setAddFirstName('');
    setAddLastName('');
    setAddEmail('');
    setAddScore('');
  };

  const updateLearnerHandler = () => {
    const firestore = firebase.database().ref('/learners').child(learnerId);
    firestore.update({
      firstName: updateFirstName,
      lastName: updateLastName,
      email: updateEmail,
      score: updateScore,
    });
    setUpdateFirstName('');
    setUpdateLastName('');
    setUpdateEmail('');
    setUpdateScore('');
  };

  const updateClickHandler = (data) => {
    setUpdateFirstName(data.firstName);
    setUpdateLastName(data.lastName);
    setUpdateEmail(data.email);
    setUpdateScore(data.score);
    setLearnerId(data.id);
  };

  const deleteLearnerHandler = (id) => {
    const firestore = firebase.database().ref('/learners').child(id);
    firestore.remove();
  };
  return (
    // add the form to add a learner
    <div className="ui hidden divider">
      <Container>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column>
              <Segment padded="very">
                <Form>
                  <Form.Field>
                    <label>First Name</label>
                    <Input
                      placeholder="First Name"
                      focus
                      value={addFirstName}
                      onChange={(e) => {
                        setAddFirstName(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name</label>
                    <Input
                      placeholder="Last Name"
                      focus
                      value={addLastName}
                      onChange={(e) => {
                        setAddLastName(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>email</label>
                    <Input
                      placeholder="email"
                      focus
                      value={addEmail}
                      onChange={(e) => {
                        setAddEmail(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Score</label>
                    <Input
                      placeholder="Score"
                      focus
                      value={addScore}
                      onChange={(e) => {
                        setAddScore(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button
                      onClick={() => {
                        addLearnerHandler();
                      }}
                      positive
                    >
                      <Icon name="add circle"></Icon>
                      Add Learner
                    </Button>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment padded="very">
                <Form>
                  <Form.Field>
                    <label>First Name</label>
                    <Input
                      placeholder="First Name"
                      focus
                      value={updateFirstName}
                      onChange={(e) => {
                        setUpdateFirstName(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name</label>
                    <Input
                      placeholder="Last Name"
                      focus
                      value={updateLastName}
                      onChange={(e) => {
                        setUpdateLastName(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>email</label>
                    <Input
                      placeholder="email"
                      focus
                      value={updateEmail}
                      onChange={(e) => {
                        setUpdateEmail(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Score</label>
                    <Input
                      placeholder="Score"
                      focus
                      value={updateScore}
                      onChange={(e) => {
                        setUpdateScore(e.target.value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button
                      onClick={() => {
                        updateLearnerHandler();
                      }}
                      primary
                    >
                      <Icon name="edit"></Icon>
                      Update Learner
                    </Button>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="1">
            <Grid.Column>
              {learnerData.length === 0 ? (
                <Segment>
                  <Header>
                    Oops! There is no data available at this time.
                  </Header>
                </Segment>
              ) : (
                <Segment padded="very">
                  <Table celled fixed singleLine>
                    <Table.Header textAlign="center">
                      <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {learnerData.map((data, index) => {
                      return (
                        <Table.Body>
                          <Table.Cell>{data.firstName}</Table.Cell>
                          <Table.Cell>{data.lastName}</Table.Cell>
                          <Table.Cell>{data.email}</Table.Cell>
                          <Table.Cell>{data.score}</Table.Cell>
                          <Table.Cell>
                            <Button
                              primary
                              onClick={() => {
                                updateClickHandler(data);
                              }}
                            >
                              <Icon name="edit"></Icon>Update
                            </Button>
                            <Button
                              color="red"
                              onClick={() => {
                                deleteLearnerHandler(data.id);
                              }}
                            >
                              <Icon name="delete"></Icon>
                              Delete
                            </Button>
                          </Table.Cell>
                        </Table.Body>
                      );
                    })}
                  </Table>
                </Segment>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default FirebaseCrud;
