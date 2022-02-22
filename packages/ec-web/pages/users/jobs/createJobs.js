import React from 'react'
import dynamic from 'next/dynamic'
import { SeperatePrice } from '../../../utils/format'
import CategorySelect from '../../../components/CategoriesSelect'
import { useState, useContext } from 'react'
import {Row, Form, Col, Button} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import AuthContext from '../../../context/AuthContext'
import Router from 'next/router'


export default function createJobs(props) {
    const { jwt, userProfile } = useContext(AuthContext)
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [timeFinish, setTimeFinish] = useState('');
    const [timeFinishUnit, setTimeFinishUnit] = useState('Hours');
    const [category, setCategory] = useState('60bc4cd9cd3b615898dfef5a');
    const [startingPrice, setStartingPrice] = useState('');
    const [image, setImage] = useState('');
    const [validated, setValidated] = useState(false);
    var count = 0;

    function addOptions(){
        var basic = 'addOption';
        if (count > 0) {
            basic += count;
            console.log(basic)
        }
        var addPlace = document.getElementById(basic);
        var elements = <div>
                            <Form.Group as={Row}>
                                <Form.Group as={Col}>
                                        <Form.Label>Tên lựa chọn</Form.Label>
                                        <Form.Control
                                            type='text'
                                            className='optionName'
                                            required
                                            ></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                        <Form.Label>Giá lựa chọn</Form.Label>
                                        <Form.Control
                                            type='number'
                                            className='optionWage'
                                            required
                                            ></Form.Control>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mô tả lựa chọn</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    className='optionDesc'
                                    required
                                    ></Form.Control>
                            </Form.Group>
                        </div>
        ++count;
        ReactDOM.render(elements, addPlace);
    }
    const checkValidate = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    async function btnClick(e){
        checkValidate(e);

        if(validated) {
            var tempOption = [];
            var optionNames = document.getElementsByClassName('optionName');
            var optionWages = document.getElementsByClassName('optionWage');
            var optionDescs = document.getElementsByClassName('optionDesc');
            for(var i in optionNames ){
                if(optionNames[i].value) {    
                    tempOption.push({
                        optionName: optionNames[i].value,
                        wage: optionWages[i].value,
                        desc: optionDescs[i].value
                    })
                }
            } 
            var option = tempOption;
            var formData = new FormData();
            const createJobInfo = {
                name: name,
                desc: desc,
                startingPrice: startingPrice,
                timeFinish: timeFinish,
                timeFinishUnit: timeFinishUnit,
                rating: [],
                option: option,
                category: category,
                meta_title: name,
                meta_desc: desc, 
                profile: userProfile[0]._id
            }
            if(coverImage) {
                formData.append('files.coverImage', coverImage[0], coverImage[0].name)
            }
            if(image) {
                for(var i of image) {
                    formData.append('files.Image', i, i.name)
                }
            }
            
            formData.append('data', JSON.stringify(createJobInfo))
            const res = await fetch(`${process.env.API_URL}/jobs`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                },
                body: formData
            });
            if(res.status === 200) {
                alert('Đã thành công đăng công việc');
                Router.push('/users/jobs')
            }
            
        }
    }

    return (
        <div className='container'>
            <div className='title'>Tạo công việc</div>
            <Form noValidate validated={validated}>
                <Form.Group>
                    <Form.Label>Tên công việc</Form.Label>
                    <Form.Control
                        type='text'  
                        name='name' 
                        placeholder='Tên công việc'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mô tả công việc</Form.Label>
                    <Form.Control
                        as='textarea'
                        placeholder='Mô tả'
                        onChange={e => setDesc(e.target.value)}
                        value={desc}
                        required></Form.Control>
                </Form.Group>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Ảnh bìa công việc</Form.Label>
                        <Form.File
                            name='coverImage'
                            onChange={(e) => setCoverImage(e.target.files)}
                            ></Form.File>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Hình ảnh liên quan</Form.Label>
                        <Form.File
                            name='coverImage'
                            onChange={(e) => setImage(e.target.files)}
                            multiple></Form.File>
                    </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>Giá khởi điểm</Form.Label>
                    <Form.Control
                        type='number' name='startingPrice'
                        onChange={e=> setStartingPrice(e.target.value)}
                        value={startingPrice}
                        required></Form.Control>
                </Form.Group>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Thời gian cần để hoàn thành công việc (Số)</Form.Label>
                        <Form.Control
                            type='number'
                            required
                            value={timeFinish}
                            onChange={(e) => setTimeFinish(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Thời gian cần để hoàn thành công việc (Chữ)</Form.Label>
                        <Form.Control
                            as='select'
                            value={timeFinishUnit}
                            onChange={(e) => setTimeFinishUnit(e.target.value)}
                            defaultValue='Hours'>
                            <option value='Hours'>Giờ</option>
                            <option value='Days'>Ngày</option>
                            <option value='Weeks'>Tuần</option>
                            <option value='Months'>Tháng</option>
                            <option value='Years'>Năm</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>Hạng mục công việc</Form.Label>
                    <Form.Control
                        as='select'
                        required
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        defaultValue={props.categories[0].id}
                        >
                            {props.categories.map(category => (
                            <option value={category.id}>{category.name}</option>
                            ))}
                        </Form.Control>
                </Form.Group>
                <div className='option'>
                    <Form.Group custom>
                                <div className='optionTitle'>Lựa chọn</div>
                        <Form.Group as={Row}>
                            <Form.Group as={Col}>
                                    <Form.Label>Tên lựa chọn</Form.Label>
                                    <Form.Control
                                        type='text'
                                        className='optionName'
                                        required
                                        ></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                    <Form.Label>Giá lựa chọn</Form.Label>
                                    <Form.Control
                                        type='number'
                                        className='optionWage'
                                        required
                                        ></Form.Control>
                            </Form.Group>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mô tả lựa chọn</Form.Label>
                            <Form.Control
                                as='textarea'
                                className='optionDesc'
                                required
                                ></Form.Control>
                        </Form.Group>
                        <div id='addOption'></div>
                        <div id='addOption1'></div>
                        <div id='addOption2'></div>
                        <div id='addOption3'></div>
                        <div id='addOption4'></div>
                        <div id='addOption5'></div>
                        <div id='addOption6'></div>
                        <button type='button' className='btn btn-primary' onClick={() => addOptions()}>Thêm lựa chọn</button>
                    </Form.Group>
                </div>
                <Row>
                    <Button variant='danger' onClick={(e) => btnClick(e)}>Đăng công việc</Button>
                </Row>
            </Form>

            <style jsx>
                {`
                .option{
                        margin: 5%;
                        background-color: #F5F5F5;
                        border-radius: 10px;
                        padding: 30px;
                        .optionTitle{
                            font-weight: 600;
                            font-size: 1.5rem;
                            margin-left: auto;
                            margin-right: auto;
                        }
                        .btn{
                            width: 100%;
                            border-radius: 10px;
                        }
                    }
                    .btn.btn-primary{
                        margin-top: 2%;
                    }
                    .tittle{
                        font-weight:500;
                    }
                    
                `}
            </style>
        </div>
    )
}

export async function getStaticProps(){
    const {API_URL} = process.env;
    const res = await fetch(`${API_URL}/categories`);
    const data = await res.json();

    return {
        props: {
            categories: data
        }
    }
}