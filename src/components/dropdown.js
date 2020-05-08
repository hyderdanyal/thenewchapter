class Dropdown extends React.Component {  
    static PropTypes = {
      list: React.PropTypes.array.isRequired
    };
    
    static defaultProps = {
      list: []
    };
    
    constructor(props) {
      super(props);    
      this.state = {
        isOpen: false,
        labelItem: null,
        typeDropdown: null
      };
    }
  
    componentWillMount() {
      const { label } = this.props.list[0];
      let firstItem = null;    
      if (typeof label != 'undefined') {
        this.checkType(false);
        firstItem = label;
      } else {
        this.checkType(true);
        firstItem = this.props.list[0];
      }        
      this.setState({
          labelItem: firstItem
      });    
    }
    checkType = (value) => {
      this.setState({
          typeDropdown: value
      });    
    };
    showDropdown = () => {
      this.setState({ isOpen: true });
      document.addEventListener("click", this.hideDropdown);
    };
    hideDropdown = () => {
      this.setState({ isOpen: false });
      document.removeEventListener("click", this.hideDropdown);
    };
    chooseItem = (value) => {    
      if (this.state.labelItem !== value) {
        this.setState({
          labelItem: value      
        })
      }    
    };
    
    renderDataDropDown = (item, index) => {    
      const {value, label} = this.state.typeDropdown ? {value: index, label: item} : item;    
      return (
        <li
          key={index}
          value={value}
          onClick={() => this.chooseItem(label)}
        >
          <a>{label}</a>
        </li> 
      )
    };
    render () {
      const { list } = this.props;    
      return (
        <div className={`dropdown ${this.state.isOpen ? 'open' : ''}`}>
          <button className="dropdown-toggle" type="button" onClick={this.showDropdown}>
            {this.state.labelItem}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {list.map(this.renderDataDropDown)}
          </ul>
      </div>
      )
    }
  }
  
  class App extends React.Component {
    render () {
      return (
        <div>
          <h1>Drop down</h1>
          <h2>Input: Array text</h2>
          <Dropdown list={["January","February","March","April","May","June","July","August","September","October","November","December"]} />
          <h2>Input: Array object</h2>
          <Dropdown list={[{value: 1, label: 'January'}, {value: 2, label:'February'}, {value: 3, label:'March'},
                           {value: 4, label:'April'},{value: 5, label:'May'},{value: 6, label:'June'},{value: 7, label:'July'},
                           {value: 8, label:'August'},{value: 9, label:'September'},{value: 10, label:'October'},
                           {value: 11, label:'November'},{value: 12, label:'December'}]} />
        </div>
      )
    }  
  }
  
  const element = <App />;
  
  ReactDOM.render(
    element,
    document.getElementById("root")
  );