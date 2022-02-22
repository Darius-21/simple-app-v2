import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { Form, Row, Col, Button, FormCheck, FormControl } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext'
import HeaderContext from '../../../context/HeaderContext'

export default function createJobsSeeker() {
    const [validated, setValidated] = useState(false);
    const { jwt, userProfile } = useContext(AuthContext);
    const { categoriesItems } = useContext(HeaderContext);

    const checkValidate = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    async function handleSubmit(event) {
        checkValidate(event);

        if(validated) {
            
            const jobInfo = {
                name: name,
                desc: desc,
                bonusDesc: bonusDesc,
                wage: wage,
                wageUnit: wageUnit,
                numberOfPeople: numberOfPeople,
                timeFinish: timeFinish,
                timeFinishUnit: timeFinishUnit,
                expireDate: expireDate,
                meta_title: name,
                meta_desc: desc,
                profile: userProfile[0]._id,
                category: category
            }
            
            var formData = new FormData();
            if(coverImage) {
                formData.append('files.coverImage', coverImage[0], coverImage[0].name)
            }
            if(image) {
                for(var i of image) {
                    formData.append('files.Image', i, i.name)
                }
            }
            
            formData.append('data', JSON.stringify(jobInfo))
            for(var i of formData.entries()) {
                console.log(i[0], i[1])
            }
            const res = await fetch(`${process.env.API_URL}/job-seekers`, {
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
    

    //Listing form elements
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [bonusDesc, setBonusDesc] = useState('');
    const [wage, setWage] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [timeFinish, setTimeFinish] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [timeFinishUnit, setTimeFinishUnit] = useState('Hours');
    const [wageUnit, setWageUnit] = useState('perJob');
    const [category, setCategory] = useState(categoriesItems[0].id);
    const [coverImage, setCoverImage] = useState('');
    const [image, setImage] = useState('');

    return (
        <div className='container'>
            <div className='title'>Tạo công việc mới</div>
            <Form noValidate validated={validated}>
                <Form.Group>
                    <Form.Label>Tên công việc</Form.Label>
                    <Form.Control
                        type='text'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Viết blog dạo'
                        ></Form.Control>
                        <FormControl.Feedback type='invalid'>Vui lòng điền đúng thông tin vào mục này</FormControl.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mô tả công việc</Form.Label>
                    <Form.Control
                        as='textarea'
                        value={desc}
                        required
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder='Viết blog là một công việc nhẹ nhàng nhưng tôi khum làm được, bạn giúp tôi nhé :)))'
                        ></Form.Control>
                        <FormControl.Feedback type='invalid'>Vui lòng điền đúng thông tin vào mục này</FormControl.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mô tả thưởng thêm công việc</Form.Label>
                    <Form.Control
                        as='textarea'
                        value={bonusDesc}
                        
                        onChange={(e) => setBonusDesc(e.target.value)}
                        placeholder='Viết tốt sẽ thưởng cho bạn tận 10k đó'
                        ></Form.Control>
                </Form.Group>
                <Form.Group>
                        <Form.Label>Hạng mục công việc</Form.Label>
                        <Form.Control
                            as='select'
                            value={category}
                            required
                            defaultValue={categoriesItems[0].id}
                            onChange={(e) => setCategory(e.target.value)}
                            >
                                {
                                    categoriesItems.map(category =>(
                                        <option value={category.id}>{category.name}</option>
                                    ))
                                }
                            </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Số người cần tuyển </Form.Label>
                    <Form.Control
                        type='number'
                        value={numberOfPeople}
                        required
                        onChange={(e) => setNumberOfPeople(e.target.value)}
                        placeholder='1'
                        ></Form.Control>
                        <FormControl.Feedback type='invalid'>Vui lòng điền đúng thông tin vào mục này</FormControl.Feedback>
                </Form.Group>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Tiền lương</Form.Label>
                        <Form.Control
                            type='number'
                            value={wage}
                            required
                            onChange={(e) => setWage(e.target.value)}
                            placeholder='500000'
                            ></Form.Control>
                            <FormControl.Feedback type='invalid'>Vui lòng điền đúng thông tin vào mục này</FormControl.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Đơn vị tính tiền lương</Form.Label>
                        <Form.Control
                            as='select'
                            value={wageUnit}
                            required
                            defaultValue='perJob'
                            onChange={(e) => setWageUnit(e.target.value)}
                            >
                                <option value='perJob'>perJob</option>
                                <option value='perPerson'>perPerson</option>
                            </Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Thời gian hoàn thành</Form.Label>
                        <Form.Control
                            type='number'
                            value={timeFinish}
                            required
                            onChange={(e) => setTimeFinish(e.target.value)}
                            placeholder='2'></Form.Control>
                            <FormControl.Feedback type='invalid'>Vui lòng điền đúng thông tin vào mục này</FormControl.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Đơn vị thời gian hoàn thành</Form.Label>
                        <Form.Control
                            as='select'
                            value={timeFinishUnit}
                            required
                            defaultValue='Hours'
                            onChange={(e) => setTimeFinishUnit(e.target.value)}
                            >
                                <option value='Hours'>Hours</option>
                                <option value='Days'>Days</option>
                                <option value='Weeks'>Weeks</option>
                                <option value='Months'>Months</option>
                                <option value='Years'>Years</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>Ngày hết hạn</Form.Label>
                    <Form.Control
                        type='date'
                        value={expireDate}
                        required
                        onChange={(e) => setExpireDate(e.target.value)}
                        placeholder=''
                        ></Form.Control>
                        <FormControl.Feedback type='invalid'>Vui lòng điền đúng thông tin vào mục này</FormControl.Feedback>
                </Form.Group>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label onClick={() => onClick()}>Ảnh bìa</Form.Label>
                        <Form.File  
                            onChange={(e) => setCoverImage(e.target.files)}></Form.File>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Ảnh liên quan</Form.Label>
                        <Form.File id='image' 
                            multiple
                            onChange={(e) => setImage(e.target.files)}></Form.File>
                    </Form.Group>
                </Row>
                <br></br>
                <Row>
                    <Button className='button' onClick={(e) => handleSubmit(e)}>Đăng công việc</Button>
                </Row>
            </Form>
            <style jsx>
                {`
                    .button{
                        margin: 10%;
                    }
                `}
            </style>
        </div>
    )
}
