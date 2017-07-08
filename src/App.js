import React, {PureComponent} from 'react';
import { Header, Icon, Container, Segment, Grid, Input, Statistic } from 'semantic-ui-react';
import './App.css';

class App extends PureComponent {
    state = { input: '', time: 0 };
    inputClear = e => {
        console.log(e.target);
        document.getElementById('snowflake-input').focus();
        this.setState({ input: '', time: 0 });
    };
    inputChange = (e, d) => this.setState({ input: d.value, time: d.value ? (d.value / 4194304) + 1420070400000 : 0 });
    render() {
        return (
            <Grid className="App" container columns={1} textAlign="center" verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h1" icon>
                            <Icon name="snowflake outline" />
                            Discord Snowflake to Timestamp Converter
                            <Header.Subheader>
                                Paste in a Discord snowflake to get the timestamp
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
                            </Statistic>
                        </Segment> : <div className="timestamp" style={{ height: '144px' }}></div>}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default App;
