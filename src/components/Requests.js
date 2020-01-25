import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const Requests = props => {
    const url = 'https://beta.autobooking.com/api/test/v1/search/'
    const styleUrl = 'styles'
    const brandUrl = 'brands_terms'
    const serviceUrl = 'terms'
    const [styleData, setStyle] = useState([])
    const [serviceData, setService] = useState([])
    const [brandData, setBrand] = useState([])
    const [selectChecks, setSelectChecks] = useState({
        service: 'serv',
        brand: 'bmw',
        style: 'barrokko',
    })

    const setDataType = (endpoint, set) => {
        fetch(url + endpoint)
            .then(res => res.json())
            .then(res => set(res.data))
    }



    useEffect(() => {
        const setData = () => {
            setDataType(styleUrl, setStyle)
            setDataType(serviceUrl, setService)
            setDataType(brandUrl, setBrand)
        }
        setData()
    }, [styleUrl, serviceUrl, brandUrl])
    useEffect(() => setSelectChecks(JSON.parse(localStorage.getItem('data'))), [])

    const changeHandler = (e) => {
        let prefix = ''
        if (e.target.name === 'service') {
            prefix = 's-'
        } else if (e.target.name === 'brand') {
            prefix = 'b-'
        } else prefix = 'st-'
        console.log(e.target.value, e.target.name, e.target.prefix)
        localStorage.setItem('data', JSON.stringify({
            ...selectChecks, [e.target.name]: e.target.value
        }))
        setSelectChecks({
            ...selectChecks, [e.target.name]: e.target.value
        })
        props.history.push(`${prefix}${e.target.name}_${e.target.value}`)
    }
    return (
        <div>
            <div className='request-child'>
                {props.children}
            </div>
            <h1>Requests</h1>
            <select className='select' name='service' onChange={(e) => changeHandler(e)} value={selectChecks.service}>
                {
                    serviceData.map((el, ind) => <option key={ind} value={el.slug}>{el.label}</option>)
                }
            </select>
            <select className='select' name='brand' onChange={(e) => changeHandler(e)} value={selectChecks.brand}>
                {
                    brandData.map((el, ind) => <option key={ind} value={el.slug}>{el.label}</option>)
                }
            </select>
            <select className='select' name='style' onChange={(e) => changeHandler(e)} value={selectChecks.style}>
                {
                    styleData.map((el, ind) => <option key={ind} value={el.slug}>{el.label}</option>)
                }
            </select>
        </div>
    )
}

export default withRouter(Requests)