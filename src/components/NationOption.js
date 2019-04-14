import React from 'react';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import BottomImg from './Nationflag';
import Radio from '@material-ui/core/Radio';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

const NationOption = class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedValue: 0,
            countries: [],
            randomCountry: [],
            countryFlag: [],
            showPhotoNum: 0,
            guessRightAns: NaN,
            userGuess: NaN,

            userScore: 0,
            rightAns: NaN,
            disableChoose: false,
            ansShow: false
        }

    }
    componentDidMount() {
        axios.get(`https://restcountries.eu/rest/v2/all`)
            .then(res => {
                this.setState({ countries: res.data })
                this.getRandomCountry()

            })
    }

    getRandomCountry = () => {


        this.setState({
            disableChoose: true, selectedValue: NaN, ansShow: false
        })
        const randCountry = []
        const nationFlag = []
        const btnChoose = 0
        const { countries } = this.state
        while (randCountry.length < 4) {
            const countrynumber = Math.floor(Math.random() * countries.length)
            const randomcountryopt = countries[countrynumber]
            if (!randCountry.includes(randomcountryopt)) {
                randCountry.push(randomcountryopt.name)
                nationFlag.push(randomcountryopt.flag)
            }
        }
        const initPhotoNum = Math.floor(Math.random() * 4)
        this.setState({
            showPhotoNum: initPhotoNum,
            randomCountry: randCountry,
            countryFlag: nationFlag,

            userGuess: NaN,
            guessRightAns: 0,
            rightAns: NaN
        })

    }



    checkWin = (name, radioNowId) => () => {
        this.setState({
            disableChoose: false
        })
        const { showPhotoNum, randomCountry } = this.state
        const ansRight = randomCountry[showPhotoNum]
        this.setState({ rightAns: ansRight, selectedValue: radioNowId })
        localStorage.setItem("selectedValue", radioNowId)
        if (ansRight === name) {

            this.setState({
                userGuess: name,
                guessRightAns: 1
            })

        } else {

            this.setState({
                guessRightAns: 0,
                userGuess: name
            })
        }


    }

    guess = (num) => (e) => {
        console.log(e.target)

        const { userScore } = this.state
        num === 1 ? this.setState({

            userScore: userScore + 1
        }) : this.setState({ userScore: userScore })

        this.setState({
            ansShow: true

        })
    }



    render() {
        const { countries, userScore, randomCountry, selectedValue,
            guessRightAns, countryFlag, showPhotoNum, userGuess, rightAns, ansShow } = this.state

        if (countries.length === 0) {
            return <div style={{
                position: 'relative', width: '200px', left: '40%', right: '40%', 'top': '50%', 'marginTop': '100px'

            }}>
                <div style={{ 'writingMode': 'horizontal-tb', width: '50px' }}>
                    載入中...
                </div>
                <div className="shadow">
                    <div className="loader">
                        <div className="mask"></div>
                    </div>
                </div>
            </div>
        }
        return (

            <div>
                <div className="score">Current score:{userScore}</div>

                {userScore < 10 ? (
                    <div className="flex-container wrap">


                        <div>
                            <div className="radioItem">
                                {randomCountry.map((name, i) =>
                                    (

                                        <div className="col-3">
                                            <div className="countryname">

                                                <Radio disabled={ansShow ? true : false}
                                                    key={name} style={{ width: 30, height: 30, backgroundColor: '#7cad3c6e' }}
                                                    name="country"
                                                    value={this.state.selectedValue}
                                                    onClick={this.checkWin(name, i)}
                                                    checked={selectedValue === i} />
                                                <label>{name}</label>

                                            </div>
                                        </div>

                                    )
                                )}
                            </div>

                            <div className="choiceFlag">
                                {ansShow ? ('') :
                                    <Button disabled={
                                        this.state.disableChoose
                                    }
                                        variant="contained" color="secondary" className="chooseButton"
                                        onClick={this.guess(guessRightAns)}
                                    >
                                        Choose
                                    </Button>

                                }
                                {ansShow ?
                                    guessRightAns === 1 ?
                                        <div className="name">
                                            <div className="col-6">
                                                <div className="countryname">
                                                    Ans.:
                                                </div>
                                                <br />
                                                <div className="countryname">{this.state.rightAns}</div>

                                            </div>
                                            <div className="col-6">
                                                <div className="countryname">
                                                    <Button variant="contained" color="secondary" className="chooseButtonNext"
                                                        onClick={this.getRandomCountry}
                                                    >Next
                              </Button>

                                                </div>
                                            </div>
                                            <br />

                                        </div> :
                                        <div>
                                            <div className="name">
                                                <div className="col-4"> <div className="countryname" >Incorrect Ans.:</div>
                                                    <br />
                                                    {userGuess === NaN ? ('') :
                                                        <div className="countryname" style={{ color: 'red' }}>{userGuess}</div>
                                                    }
                                                </div>
                                                <div className="col-4">   <div className="countryname" >Ans.:</div>
                                                    <br />
                                                    {rightAns === NaN ? ('') :
                                                        <div className="countryname" style={{ color: 'green' }}>{rightAns}</div>
                                                    }
                                                </div>
                                                <div className="col-4">
                                                    <div className="countryname">
                                                        <Button variant="contained" color="secondary" className="chooseButton"
                                                            onClick={this.getRandomCountry}
                                                        >
                                                            Next
                                                  </Button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    : ('')}

                                <div className="countryFlagImg">
                                    <BottomImg flag={countryFlag}
                                        num={showPhotoNum} />
                                </div>


                            </div>


                        </div>



                    </div>
                ) :
                    <div className="win">
                        Congratulations!</div>
                }
            </div>
        )

    }


}

export default withStyles(styles)(NationOption)