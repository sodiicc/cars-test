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
        service: 'farbuvannia',
        brand: 'acura',
        style: 'barrokko',
    })
    const [pageData, setPageData] = useState(null)

    const setDataType = (endpoint, set) => {
        fetch(url + endpoint, { 'cache-control': 'no-store' })
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

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('data'))) setSelectChecks(JSON.parse(localStorage.getItem('data')))
    }, [])

    useEffect(() => props.history.push(`s-${selectChecks.service}--b-${selectChecks.brand}--st-${selectChecks.style}`), [])

    const changeHandler = (e) => {
        let service = selectChecks.service
        let brand = selectChecks.brand
        let style = selectChecks.style
        if (e.target.name === 'service') {
            service = e.target.value
        } else if (e.target.name === 'brand') {
            brand = e.target.value
        } else style = e.target.value
        localStorage.setItem('data', JSON.stringify({
            ...selectChecks, [e.target.name]: e.target.value
        }))
        setSelectChecks({
            ...selectChecks, [e.target.name]: e.target.value
        })
        props.history.push(`s-${service}--b-${brand}--st-${style}`)
        fetch(url + `parse_link?service_slug=${service}&brand_slug=${brand}&style_slug=${style}`, { 'cache-control': 'no-store' })
            .then(res => res.json())
            .then(res => setPageData(res))
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
            {
                pageData ?
                    <div>
                        <div className='show-data'>
                            <ul>
                                <li>{pageData.brand.label}</li>
                                <li>{pageData.service.label}</li>
                                <li>{pageData.style.label}</li>
                            </ul>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default withRouter(Requests)