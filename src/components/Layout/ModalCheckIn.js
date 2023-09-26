import React, {useState} from "react";
import {DatePicker, Form, Input, Modal} from 'antd';
import {useDispatch} from "react-redux";
import  {checkInOk} from "../../redux/slice/checkIn";

const CollectionCreateForm = ({
                                  openCheckIn,
                                  onCreate,

                                  onCancel,
                              }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const {RangePicker} = DatePicker;
    const [selectedDates, setSelectedDates] = useState({dateOn: '', dateOut: ''});
    const handleFormSubmit = (name, date) => {
        onCreate(true)
        const dateForStore = {
            name: name,
            date: date
        }
        dispatch(checkInOk(dateForStore))

    };
    const handlerSelectDate = (dates) => {
        const dateOn = dates[0] ? dates[0].format('YYYY-MM-DD') : '';
        const dateOut = dates[1] ? dates[1].format('YYYY-MM-DD') : '';
        setSelectedDates({dateOn, dateOut})
    }

    return (
        <Modal
            open={openCheckIn}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        const {title} = values
                        handleFormSubmit(title, selectedDates)

                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{modifier: 'public'}}
            >
                <Form.Item
                    name="title"
                    label="Please enter guest name"
                    rules={[{required: true, message: 'Please input the title of collection!'}]}
                >
                    <Input/>
                </Form.Item>
                <RangePicker
                    showTime={{format: 'HH:mm'}}
                    picker={['date', 'date']}
                    onChange={handlerSelectDate} // Обновляем состояние при изменении даты
                />
            </Form>
        </Modal>
    );
};

export default CollectionCreateForm;
