import {Modal, Upload} from 'antd'
import ImgCrop from 'antd-img-crop'
import PropTypes from 'prop-types'
import React, {useState} from 'react'

export default function ChangePicture (props) {
    const {hasFile, setFile} = props
    const [preview, setPreview] = useState({
        image: '',
        visible: false,
        title: ''
    })

    const uploadProps = {
        beforeUpload: (file) => {
            setFile(file)
            return true
        },
        listType: 'picture-card',
        maxCount: 1,
        onRemove: () => {
            setFile(null)
        },
        method: 'get'
    }

    function getBase64 (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }
    const onPreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreview({
            image: file.url || file.preview,
            visible: true,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    }

    return (
        <>
            <Upload {...uploadProps} onPreview={onPreview}>
                {!hasFile  ? 'Change' : 'Select'}
            </Upload>
            <Modal
                width={400}
                open={preview.visible}
                title={preview.title}
                footer={null}
                onCancel={() => { setPreview({ visible: false }) }}>
                <img alt="Profile Picture" style={{ width: '100%' }} src={preview.image} />
            </Modal>
        </>
    )
}

ChangePicture.propTypes = {
    hasFile: false,
}

ChangePicture.propTypes = {
    setFile: PropTypes.func,
    hasFile: PropTypes.bool
}
