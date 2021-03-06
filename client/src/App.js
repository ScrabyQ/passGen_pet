import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Form, Button} from 'react-bootstrap'
import {useState} from "react";

import { ClipboardCopy } from "./modules/ClipboardCopy"

async function getPasswords(settings) {

    let response = await fetch('/get_password', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(settings)
    })
    let data = await response.json();

    console.log('response.json()', data)

    return data


}

function displayPasswords(passwords) {
    let data = JSON.parse(passwords)
    console.log("disp", data)
    let arr = [];

    for (let key in data) {
        console.log(data[key])
        arr.push(data[key])
    }
    console.log('arr', arr)
    return arr


    // passwords.forEach(pass => {
    //     return <div>{pass}</div>
    // })
}

function App() {
    let [passLength, setPassLength] = useState(8)
    let [UC_EN, setUC_EN] = useState(false)
    let [UC_RU, setUC_RU] = useState(false)
    let [LC_EN, setLC_EN] = useState(false)
    let [LC_RU, setLC_RU] = useState(false)
    let [digit, setDigit] = useState(false)
    let [symbol, setSymbol] = useState(false)
    let [repeat, setRepeat] = useState(true)
    let [passwords, setPasswords] = useState({})
    const [toggleCard, setToggleCard] = useState(false)
    const [resizeInfo, setResizeInfo] = useState(false)
    const [displayPass, setDisplayPass] = useState(false)

    const settings = {
        length: passLength,
        UC_EN,
        UC_RU,
        LC_EN,
        LC_RU,
        digit,
        symbol,
        repeat
    }
    return (
        <div className="App">
            <header className="App-header">
                <div className={toggleCard ? `App-card-active` : `App-card`}>
                    <div className="container">
                        <div className="row">
                            <Form className={resizeInfo ? 'col-md-4 col-sm-12' : 'col-md-10 col-sm-12'}>
                                <Form.Group className="mb-1" controlId="dig">
                                    <Form.Label>???????????? ????????????: {passLength}</Form.Label>
                                    <div className="range">
                                        <Form.Range min="1" max="32" defaultValue="8"
                                                    onChange={(e) => {
                                                        setPassLength(passLength = e.target.value)
                                                    }}/>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-1 mt-4" controlId="uc_en">
                                    <Form.Check className="ml-3" type="checkbox" label="????????????????: ??????????????????"
                                                onChange={(e) => {
                                                    setUC_EN(UC_EN = e.target.checked)
                                                }}/>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="lc_en">
                                    <Form.Check className="ml-3" type="checkbox" label="????????????????: ??????????????????"
                                                onChange={(e) => {
                                                    setLC_EN(LC_EN = e.target.checked)
                                                }}/>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="uc_ru">
                                    <Form.Check className="ml-3" type="checkbox" label="??????????????????: ??????????????????"
                                                onChange={(e) => {
                                                    setUC_RU(UC_RU = e.target.checked)
                                                }}/>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="lc_ru">
                                    <Form.Check className="ml-3" type="checkbox" label="??????????????????: ??????????????????"
                                                onChange={(e) => {
                                                    setLC_RU(LC_RU = e.target.checked)
                                                }}/>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="sym">
                                    <Form.Check className="ml-3" type="checkbox" label="??????????????"
                                                onChange={(e) => {
                                                    setSymbol(symbol = e.target.checked)
                                                }}/>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="dig">
                                    <Form.Check className="ml-1" type="checkbox" label="??????????"
                                                onChange={(e) => {
                                                    setDigit(digit = e.target.checked)
                                                }}/>
                                </Form.Group>
                                <Form.Group className="mt-4" controlId="no_repeat">
                                    <Form.Check className="ml-1" type="checkbox" label="?????? ?????????????????? ????????????????"
                                                onChange={(e) => {
                                                    setRepeat(repeat = !e.target.checked)
                                                }}/>
                                </Form.Group>
                                <Form.Group className="mt-4" controlId="no_repeat">
                                    <Button onClick={
                                        async () => {
                                            let res = await getPasswords(settings)
                                            setPasswords(passwords = displayPasswords(res))

                                            setToggleCard(true)
                                            setTimeout(() => {
                                                setResizeInfo(true)

                                            }, 300)
                                            setTimeout(() => {

                                                setDisplayPass(true)
                                            }, 500)
                                        }
                                    }>??????????????????????????</Button>
                                </Form.Group>
                            </Form>
                            <div className="col-md-2 col-sm-12"><br/> </div>
                            <div className={displayPass ? "col-md-6 col-sm-12" : "hidden"}>
                                {Object.keys(passwords).map(item => {

                                    let item_id = `item__${item}`;
                                        return <ClipboardCopy item={item} _id={item_id} content={passwords[item]}/>

                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
