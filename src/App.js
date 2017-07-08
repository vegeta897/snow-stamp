import React, {PureComponent} from 'react';
import { Header, Icon, Container, Segment, Grid, Input, Statistic, Modal } from 'semantic-ui-react';
import './App.css';

class App extends PureComponent {
    state = { input: '', time: 0, helpOpen: false };
    inputClear = e => {
        document.getElementById('snowflake-input').focus();
        this.setState({ input: '', time: 0 });
    };
    inputChange = (e, d) => this.setState({ input: d.value, time: d.value ? (d.value / 4194304) + 1420070400000 : 0 });
    showHelp = e => this.setState({ helpOpen: true });
    hideHelp = e => this.setState({ helpOpen: false });
    render() {
        return (
            <div className="App">
                <Grid container columns={1} textAlign="center" verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h1" icon>
                                <Icon name="snowflake outline" />
                                Discord Snowflake to Timestamp Converter
                                <Header.Subheader>
                                    Paste in a Discord snowflake to get the timestamp<br />
                                    <a id="help-link" onClick={this.showHelp}>What is a snowflake?</a>
                                </Header.Subheader>
                            </Header>
                            <Container>
                                <Input value={this.state.input} onChange={this.inputChange} placeholder="e.g. 86913608335773696"
                                       action={{ icon: 'refresh', onClick: this.inputClear }} id="snowflake-input"
                                       icon="snowflake outline" iconPosition='left' className="gargantuan" />
                            </Container>
                            {this.state.time ? <Segment padded compact inverted className="timestamp">
                                <Statistic inverted size="large">
                                    <Statistic.Value>{new Date(this.state.time).toLocaleString()}</Statistic.Value>
                                    <Statistic.Label>{(new Date()).toString().split('(')[1].slice(0, -1)}</Statistic.Label>
                                    <Statistic.Value>{new Date(this.state.time).getTime()/1000|0}</Statistic.Value>
                                    <Statistic.Label>UNIX</Statistic.Label>
                                </Statistic>
                            </Segment> : <div className="timestamp" style={{ height: '251px' }}></div>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Modal size="small" dimmer="blurring" open={this.state.helpOpen} 
                       closeOnDimmerClick closeOnEscape onClose={this.hideHelp} closeIcon="close">
                    <Modal.Content>
                        <p>A Snowflake is essentially a unique ID for a resource (message, user, channel, etc) which contains a timestamp.</p>
                        <p>You can copy the snowflakes from messages in Discord by right clicking on them. You must have Developer Mode enabled, which is found in <strong>User Settings</strong> > <strong>Appearance</strong></p>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default App;
