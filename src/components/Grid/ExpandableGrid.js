/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint react/prop-types: 0 */
/* eslint react/jsx-no-bind: 0 */

import React from 'react'
import PropTypes, { func, element } from 'prop-types';
import firebase from '../../firebase'
import Rating from "react-rating";
import "../../Styles/GridButton.css"
import {
    MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage,
    MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn
} from "mdbreact";


var gridTitle
var gridBookId
var gridDesc
var gridImgURL
var bookExists = true
var Books = []
var hasLoaded = false
var elements
class SingleGridCell extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            selected_id: '',
            window_width: window.innerWidth
        }
    }

    cellClick(event) {
        this.props.handleCellClick(event)
    }

    render() {
        var SingleGridCellStyle = {
            background: 'url(' + this.props.SingleGridCellData['img'] + ') no-repeat center center',
            backgroundSize: this.props.cellSize,
            width: "260px",
            height: "340px",
            display: 'inline-block',
            margin: this.props.cellMargin,
            marginBottom: 25,
            position: 'relative'
        }

        return (
            <li className='SingleGridCell' style={SingleGridCellStyle} id={this.props.id} onClick={this.cellClick.bind(this)} />
        )
    }
}

class ReactExpandableGrid extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            selected_id: '',
            gridData: JSON.parse(this.props.gridData),
            bookexists: true
        }

        // console.log('Grid data',this.props.gridData)
    }

    handleResize() {
        if (this.state.expanded) {
            var target = document.getElementById(this.state.selected_id)
            this.renderExpandedDetail(target)
        }
        this.makeItMobileFriendly()
    }

    makeItMobileFriendly() {
        var leftPanel = document.getElementById('ExpandedDetail_left')
        var rightPanel = document.getElementById('ExpandedDetail_right')
        if (window.innerWidth < this.props.show_mobile_style_from_width) {
            leftPanel.style.display = 'none'
            rightPanel.style.width = '100%'
        } else {
            leftPanel.style.display = 'block'
            leftPanel.style.width = this.props.ExpandedDetail_left_width
            rightPanel.style.width = this.props.ExpandedDetail_right_width
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleResize.bind(this))
    }

    componentDidMount() {

    }

    componentWillUnmount() { }
    getRelatedBooks(thisIdNumber) {

        gridBookId = this.state.gridData[thisIdNumber]['bookid']
        gridTitle = this.state.gridData[thisIdNumber]['title']
        return fetch(`http://127.0.0.1:5000/tagbased?Title=${gridBookId}`)



    }
    renderRelatedBooks(Books) {





    }
    renderExpandedDetail(target, Books) {
        console.log('Test', elements)
        console.log('Test2', Books)

        var thisId = target.id
        var thisIdNumber = parseInt(thisId.substring(10))
        var detail = document.getElementById('expandedDetail')
        var ol = target.parentNode
        var lengthOfList = parseInt(ol.childNodes.length)
        var startingIndex = thisIdNumber + 1

        var insertedFlag = false

        ol.insertBefore(detail, ol.childNodes[lengthOfList])




        for (var i = startingIndex; i < lengthOfList; i++) {
            if (ol.childNodes[i].className === 'SingleGridCell') {
                if (ol.childNodes[i].offsetTop !== ol.childNodes[thisIdNumber].offsetTop) {
                    ol.childNodes[i].insertAdjacentElement('beforebegin', detail)
                    insertedFlag = true
                    break
                }
            }
        }

        if (insertedFlag === false) {
            ol.childNodes[lengthOfList - 1].insertAdjacentElement('afterend', detail)
        }

        var cell = document.getElementById(thisId)
        var arrow = document.getElementById('selected_arrow')
        cell.append(arrow)
        arrow.style.display = 'block'

    }

    closeExpandedDetail() {

        this.setState({
            expanded: false,
            selected_id: ''
        }, function afterStateChange() {
            var detail = document.getElementById('expandedDetail')
            detail.style.display = 'none'
            var arrow = document.getElementById('selected_arrow')
            arrow.style.display = 'none'
        })
    }
    // conditionalChaining(value){
    //     if(value){this.setState({bookexists:true})
    //     bookExists=true}
    //     else{}
    // }
    handleCellClick(event) {

        var target = event.target
        var thisIdNumber = parseInt(event.target.id.substring(10))
        var bookid = this.state.gridData[thisIdNumber]['bookid']

        // console.log(bookid)
        firebase.bookExists(bookid).then(() => {
            this.setState({ bookexists: true })
            bookExists = true
            // console.log("Yes",this.state.bookexists)
        })
            .catch(() => {
                this.setState({ bookexists: false })
                bookExists = false
                // console.log('No',this.state.bookexists)
                // console.log('No2',bookExists)
            })

        if (this.state.expanded) { // expanded == true
            if (this.state.selected_id === event.target.id) { // Clicking on already opened detail
                this.closeExpandedDetail()
                this.renderExpandedDetail(target)
            } else { // Clicking on a different thumbnail, when detail is already expanded
                this.setState({
                    expanded: true,
                    selected_id: event.target.id
                }, function afterStateChange() {
                    var detail = document.getElementById('expandedDetail')
                    var description = document.getElementById('ExpandedDetailDescription')
                    var title = document.getElementById('ExpandedDetailTitle')
                    var img = document.getElementById('ExpandedDetailImage')
                    var DescriptionLink = document.getElementById('ExpandedDetailDescriptionLink')
                    var ImageLink = document.getElementById('ExpandedDetailImageLink')
                    description.innerHTML = this.state.gridData[thisIdNumber]['description']
                    title.innerHTML = this.state.gridData[thisIdNumber]['title']
                    img.src = this.state.gridData[thisIdNumber]['img']
                    DescriptionLink.href = this.state.gridData[thisIdNumber]['link']
                    ImageLink.href = this.state.gridData[thisIdNumber]['link']
                    gridBookId = this.state.gridData[thisIdNumber]['bookid']
                    gridTitle = this.state.gridData[thisIdNumber]['title']
                    gridImgURL = img.src
                    gridDesc = description.innerHTML
                    this.getRelatedBooks(thisIdNumber)
                        .then(response => response.json())
                        .then((data) => {
                            Books = data.map(book => {
                                const { Title, Bookid, ImgURL, Desc } = book
                                return { id: Bookid, image: ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, title: Title, desc: Desc, imageBg: ImgURL }
                            })

                            hasLoaded = true
                            elements = Books.map((element) => {
                                return (
                                    <li key={element.id} style={{ overflow: 'auto' }}>
                                        <img src={element.image} style={{ height: '200px', width: '150px' }}></img>
                                        <h4>{element.title}</h4>
                                    </li>
                                )
                            })
                            this.renderExpandedDetail(target, Books)
                        })

                    detail.style.display = 'block'
                    // console.log("BOOKID",this.state.gridData[thisIdNumber]['bookid'])  
                })
            }
        } else { // expanded == false
            this.setState({
                expanded: true,
                selected_id: event.target.id
            }, function afterStateChange() {
                var detail = document.getElementById('expandedDetail')
                var description = document.getElementById('ExpandedDetailDescription')
                var title = document.getElementById('ExpandedDetailTitle')
                var img = document.getElementById('ExpandedDetailImage')
                var DescriptionLink = document.getElementById('ExpandedDetailDescriptionLink')
                var ImageLink = document.getElementById('ExpandedDetailImageLink')
                description.innerHTML = this.state.gridData[thisIdNumber]['description']
                title.innerHTML = this.state.gridData[thisIdNumber]['title']
                img.src = this.state.gridData[thisIdNumber]['img']
                DescriptionLink.href = this.state.gridData[thisIdNumber]['link']
                ImageLink.href = this.state.gridData[thisIdNumber]['link']

                this.getRelatedBooks(thisIdNumber)
                    .then(response => response.json())
                    .then((data) => {
                        Books = data.map(book => {
                            const { Title, Bookid, ImgURL, Desc } = book
                            return { id: Bookid, image: ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, title: Title, desc: Desc, imageBg: ImgURL }
                        })

                        hasLoaded = true
                        elements = Books.map((element) => {
                            return (
                                <li key={element.id} style={{ overflow: 'auto' }}>
                                    <img src={element.image} style={{ height: '200px', width: '150px' }}></img>
                                    <h4>{element.title}</h4>
                                </li>
                            )
                        })
                    })
                if (hasLoaded) {
                    this.renderExpandedDetail(target, Books)
                }
                // console.log("BOOKID",this.state.gridData[thisIdNumber]['bookid'])  

                gridBookId = this.state.gridData[thisIdNumber]['bookid']
                gridTitle = this.state.gridData[thisIdNumber]['title']
                gridImgURL = img.src
                gridDesc = description.innerHTML
                // console.log('Test',gridBookId)
                detail.style.display = 'block'
            })
        }
    }

    generateGrid() {
        var grid = []
        var idCounter = -1 // To help simplify mapping to object array indices. For example, <li> with 0th id corresponds to 0th child of <ol>
        var gridData = this.state.gridData

        for (var i in gridData) {
            idCounter = idCounter + 1
            var thisUniqueKey = 'grid_cell_' + idCounter.toString()
            grid.push(<SingleGridCell handleCellClick={this.handleCellClick.bind(this)} key={thisUniqueKey} id={thisUniqueKey} cellMargin={this.props.cellMargin} SingleGridCellData={gridData[i]} cellSize={this.props.cellSize} />)
        }

        var cssforExpandedDetail = {
            backgroundColor: this.props.detailBackgroundColor,
            // height: this.props.detailHeight,
            height: '600px',
            display: 'none',
            position: 'relative',
            padding: '20px',
            transition: 'display 2s ease-in-out 0.5s'
        }

        var cssforExpandedDetailImage = {
            display: 'inline-block',
            maxWidth: this.props.ExpandedDetail_image_size,
            width: '70',
            height: '100%',
            align: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto'
        }

        var cssforExpandedDetailTitle = {
            backgroundColor: this.props.ExpandedDetail_title_bgColor,
            width: '100%',
            height: 'auto',
            marginBottom: '15px'
        }

        var cssforExpandedDetailDescription = {
            backgroundColor: this.props.ExpandedDetail_description_bgColor,
            color: this.props.ExpandedDetail_font_color,
            width: 'auto%',
            height: '80%',
            marginRight: '30px',
            marginLeft: '30px',
            textAlign: 'justify',
            wordWrap: 'break-word',
            overflow: 'auto',
            whiteSpaces: 'break-spaces'
        }

        var cssforExpandedDetailLeft
        var cssforExpandedDetailRight

        cssforExpandedDetailLeft = {
            width: this.props.ExpandedDetail_left_width,
            height: '100%',
            float: 'left',
            position: 'relative'
        }

        cssforExpandedDetailRight = {
            width: this.props.ExpandedDetail_right_width,
            height: '100%',
            float: 'right',
            position: 'relative'
        }

        var cssForDescriptionLink = {
            textDecoration: 'none',
            position: 'relative',
            float: 'bottom',
            bottom: -5,
            cursor: 'pointer'
        }

        var cssForImageLink = {
            cursor: 'pointer'
        }

        var cssforExpandedDetailClose = {
            textDecoration: 'none',
            position: 'relative',
            float: 'right',
            top: 10,
            right: 10,
            cursor: 'pointer'
        }




        // Make Mobile Friendly
        if (window.innerWidth < this.props.show_mobile_style_from_width) {
            cssforExpandedDetailLeft = {
                width: '0%',
                height: '100%',
                float: 'left',
                position: 'relative',
                display: 'none'
            }

            cssforExpandedDetailRight = {
                width: '100%',
                height: '100%',
                float: 'right',
                position: 'relative'
            }

        }

        var closeX
        if (this.props.ExpandedDetail_closeX_bool) {
            closeX = 'X'
        } else {
            closeX = ''
        }


        // console.log(Books, hasLoaded)
        grid.push(

            <li style={cssforExpandedDetail} key='expandedDetail' id='expandedDetail'>
                <div style={{ height: '300px' }}>
                    <div id='ExpandedDetail_left' className='ExpandedDetail_left' style={cssforExpandedDetailLeft}>
                        <a id='ExpandedDetailImageLink' style={cssForImageLink}>
                            <img id='ExpandedDetailImage' className='ExpandedDetailImage' style={cssforExpandedDetailImage} alt='' />
                        </a>
                    </div>
                    <div id='ExpandedDetail_right' className='ExpandedDetail_right' style={cssforExpandedDetailRight}>
                        <div id='ExpandedDetail_close' key='ExpandedDetail_close' style={cssforExpandedDetailClose} onClick={this.closeExpandedDetail.bind(this)}>{closeX}</div>
                        <div id='ExpandedDetailTitle' className='ExpandedDetailTitle' style={cssforExpandedDetailTitle}> Title </div>
                        <div id='ExpandedDetailDescription' className='ExpandedDetailDescription' style={cssforExpandedDetailDescription}> Some Description</div>
                        {this.state.bookexists ? (<button className='gridbutton'
                            onClick={() => {
                                firebase.deleteBook(gridBookId)
                                this.setState({ bookexists: false })
                            }}>
                            Remove from My List</button>) : (<button className='gridbutton'
                                onClick={() => {

                                    firebase.addMyList(firebase.getCurrentUsername(), firebase.getCurrentUID(), gridBookId, gridTitle, gridDesc, gridImgURL)
                                    this.setState({ bookexists: true })
                                }}>
                                Add to My List</button>
                            )}


                        <Rating className="gridrating"
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            fractions={2}
                            onClick={(value) => {
                                firebase.addRating(firebase.getCurrentUsername(), firebase.getCurrentUID(), gridBookId, value)
                                //   console.log(firebase.getCurrentUID(),movie.id,value)
                            }}
                        />
                        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
                        <a id='ExpandedDetailDescriptionLink' className="gridlink" style={cssForDescriptionLink}> → Get Book </a>
                    </div>
                </div>
                <br></br>

                <div style={{ color: '#fead03' }}><ul>{elements}</ul>  </div>

            </li>

        )

        return grid
    }

    render() {
        var rows = this.generateGrid()

        var cssForGridDetailExpansion = {
            width: '100%',
            position: 'relative'
        }

        var cssForGridList = {
            listStyle: 'none',
            padding: 0,
            display: 'inline-block'
        }

        var cssForTheGridHolder = {
            width: '100%',
            backgroundColor: this.props.bgColor,
            margin: 0,
            textAlign: 'center'
        }

        var cssForSelectedArrow = {
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderBottom: '30px solid' + this.props.detailBackgroundColor,
            marginTop: '340px',
            marginLeft: this.props.cellSize / 2 - 20,
            display: 'none'
        }

        return (
            <div id='GridDetailExpansion' style={cssForGridDetailExpansion}>
                <div id='theGridHolder' style={cssForTheGridHolder}>
                    <ol id='gridList' style={cssForGridList}>
                        {rows}
                    </ol>
                </div>
                <div id='selected_arrow' style={cssForSelectedArrow} />
            </div>
        )
    }
}

ReactExpandableGrid.propTypes = {
    gridData: PropTypes.string,
    cellSize: PropTypes.number,
    cellMargin: PropTypes.number,
    bgColor: PropTypes.string,
    detailWidth: PropTypes.string, // in %
    detailHeight: PropTypes.number,
    detailBackgroundColor: PropTypes.string,
    ExpandedDetail_right_width: PropTypes.string, // in %
    ExpandedDetail_left_width: PropTypes.string, // in %
    ExpandedDetail_description_bgColor: PropTypes.string,
    ExpandedDetail_title_bgColor: PropTypes.string,
    ExpandedDetail_img_bgColor: PropTypes.string,
    ExpandedDetail_link_text: PropTypes.string,
    ExpandedDetail_font_color: PropTypes.string,
    ExpandedDetail_closeX_bool: PropTypes.bool,
    show_mobile_style_from_width: PropTypes.number
}

var data = [
    { 'img': 'http://i.imgur.com/zIEjP6Q.jpg', 'link': 'https://www.instagram.com/p/BRFjVZtgSJD/', 'title': 'Westland Tai Poutini National Park', 'description': 'Photo by @christopheviseux / The Westland Tai Poutini National Park in New Zealand’s South Island offers a remarkable opportunity to take a guided walk on a glacier. A helicopter drop high on the Franz Josef Glacier, provides access to explore stunning ice formations and blue ice caves. Follow me for more images around the world @christopheviseux #newzealand #mountain #ice' },
    { 'img': 'http://i.imgur.com/rCrvQTv.jpg', 'link': 'https://www.instagram.com/p/BQ6_Wa2gmdR/', 'title': 'Dubai Desert Conservation Reserve', 'description': 'Photo by @christopheviseux / Early morning flight on a hot air balloon ride above the Dubai Desert Conservation Reserve. Merely an hour drive from the city, the park was created to protect indigenous species and biodiversity. The Arabian Oryx, which was close to extinction, now has a population well over 100. There are many options to explore the desert and flying above may be one of the most mesmerizing ways. Follow me @christopheviseux for more images from the Middle East. #dubai #desert' },
    { 'img': 'http://i.imgur.com/U8iVzVl.jpg', 'link': 'https://www.instagram.com/p/BQyfDiKAEq9/', 'title': 'Crumbling Reflections', 'description': 'Photo @pedromcbride // Crumbling Reflections: Much has changed in Cuba over the 17 years I have visited this island. But much has stayed the same. Time still ticks at a Cuban pace and old cars still run… I don’t know how... and while pockets of new construction and renovation exist thanks to a growing tourism boom, most buildings are crumbling and cracking under the Caribbean climate. But amidst the hardship, nostalgia and messy vitality, the Cuban people keep moving, like their cars. And somehow, they do it with a colorful friendliness and warmth that always amazes me. To see more, follow @pedromcbride #cuba #havana #photo #workshop @natgeoexpeditions #reflection #photooftheday #petemcbride.' },
    { 'img': 'http://i.imgur.com/Ky9aJlE.jpg', 'link': 'https://www.instagram.com/p/BQxf6CEgD8p/', 'title': 'Impalas', 'description': 'Impetious young impala go head-to-head as they practice sparring. A talent they will need later in life when the rut begins. Photographed on assignment for @natgeotravel in Kruger National Park. For more images from Kruger, South Africa, follow @kengeiger #natgeotravel #krugernationalpark' },
    { 'img': 'http://i.imgur.com/mf3qfzt.jpg', 'link': 'https://www.instagram.com/p/BQvy7gbgynF/', 'title': 'Elephants', 'description': 'Photo by @ronan_donovan // Two bull African elephants at dawn in Uganda\'s Murchison Falls National Park. See more from Uganda with @ronan_donovan.' },
    { 'img': 'http://i.imgur.com/zIEjP6Q.jpg', 'link': 'https://www.instagram.com/p/BRFjVZtgSJD/', 'title': 'Westland Tai Poutini National Park', 'description': 'Photo by @christopheviseux / The Westland Tai Poutini National Park in New Zealand’s South Island offers a remarkable opportunity to take a guided walk on a glacier. A helicopter drop high on the Franz Josef Glacier, provides access to explore stunning ice formations and blue ice caves. Follow me for more images around the world @christopheviseux #newzealand #mountain #ice' },
    { 'img': 'http://i.imgur.com/rCrvQTv.jpg', 'link': 'https://www.instagram.com/p/BQ6_Wa2gmdR/', 'title': 'Dubai Desert Conservation Reserve', 'description': 'Photo by @christopheviseux / Early morning flight on a hot air balloon ride above the Dubai Desert Conservation Reserve. Merely an hour drive from the city, the park was created to protect indigenous species and biodiversity. The Arabian Oryx, which was close to extinction, now has a population well over 100. There are many options to explore the desert and flying above may be one of the most mesmerizing ways. Follow me @christopheviseux for more images from the Middle East. #dubai #desert' },
    { 'img': 'http://i.imgur.com/U8iVzVl.jpg', 'link': 'https://www.instagram.com/p/BQyfDiKAEq9/', 'title': 'Crumbling Reflections', 'description': 'Photo @pedromcbride // Crumbling Reflections: Much has changed in Cuba over the 17 years I have visited this island. But much has stayed the same. Time still ticks at a Cuban pace and old cars still run… I don’t know how... and while pockets of new construction and renovation exist thanks to a growing tourism boom, most buildings are crumbling and cracking under the Caribbean climate. But amidst the hardship, nostalgia and messy vitality, the Cuban people keep moving, like their cars. And somehow, they do it with a colorful friendliness and warmth that always amazes me. To see more, follow @pedromcbride #cuba #havana #photo #workshop @natgeoexpeditions #reflection #photooftheday #petemcbride.' },
    { 'img': 'http://i.imgur.com/Ky9aJlE.jpg', 'link': 'https://www.instagram.com/p/BQxf6CEgD8p/', 'title': 'Impalas', 'description': 'Impetious young impala go head-to-head as they practice sparring. A talent they will need later in life when the rut begins. Photographed on assignment for @natgeotravel in Kruger National Park. For more images from Kruger, South Africa, follow @kengeiger #natgeotravel #krugernationalpark' },
    { 'img': 'http://i.imgur.com/mf3qfzt.jpg', 'link': 'https://www.instagram.com/p/BQvy7gbgynF/', 'title': 'Elephants', 'description': 'Photo by @ronan_donovan // Two bull African elephants at dawn in Uganda\'s Murchison Falls National Park. See more from Uganda with @ronan_donovan.' },
    { 'img': 'http://i.imgur.com/zIEjP6Q.jpg', 'link': 'https://www.instagram.com/p/BRFjVZtgSJD/', 'title': 'Westland Tai Poutini National Park', 'description': 'Photo by @christopheviseux / The Westland Tai Poutini National Park in New Zealand’s South Island offers a remarkable opportunity to take a guided walk on a glacier. A helicopter drop high on the Franz Josef Glacier, provides access to explore stunning ice formations and blue ice caves. Follow me for more images around the world @christopheviseux #newzealand #mountain #ice' },
    { 'img': 'http://i.imgur.com/rCrvQTv.jpg', 'link': 'https://www.instagram.com/p/BQ6_Wa2gmdR/', 'title': 'Dubai Desert Conservation Reserve', 'description': 'Photo by @christopheviseux / Early morning flight on a hot air balloon ride above the Dubai Desert Conservation Reserve. Merely an hour drive from the city, the park was created to protect indigenous species and biodiversity. The Arabian Oryx, which was close to extinction, now has a population well over 100. There are many options to explore the desert and flying above may be one of the most mesmerizing ways. Follow me @christopheviseux for more images from the Middle East. #dubai #desert' },
    { 'img': 'http://i.imgur.com/rCrvQTv.jpg', 'link': 'https://www.instagram.com/p/BQ6_Wa2gmdR/', 'title': 'Dubai Desert Conservation Reserve', 'description': 'Photo by @christopheviseux / Early morning flight on a hot air balloon ride above the Dubai Desert Conservation Reserve. Merely an hour drive from the city, the park was created to protect indigenous species and biodiversity. The Arabian Oryx, which was close to extinction, now has a population well over 100. There are many options to explore the desert and flying above may be one of the most mesmerizing ways. Follow me @christopheviseux for more images from the Middle East. #dubai #desert' }
]

ReactExpandableGrid.defaultProps = {
    gridData: JSON.stringify(data),
    cellSize: 250,
    cellMargin: 25,
    bgColor: 'transparent',
    detailWidth: '100%',
    detailHeight: 300,
    detailBackgroundColor: '#D9D9D9',
    ExpandedDetail_right_width: '60%',
    ExpandedDetail_left_width: '40%',
    ExpandedDetail_image_size: 300,
    ExpandedDetail_description_bgColor: '#D9D9D9',
    ExpandedDetail_title_bgColor: '#D9D9D9',
    ExpandedDetail_img_bgColor: '#D9D9D9',
    ExpandedDetail_link_text: '→ Link',
    ExpandedDetail_font_color: '#434343',
    ExpandedDetail_closeX_bool: true,
    show_mobile_style_from_width: 600,
}

export default ReactExpandableGrid
