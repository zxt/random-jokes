import React from 'react'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      joke: {}
    }

    this.getJoke = this.getJoke.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  getJoke() {
    fetch("https://sv443.net/jokeapi/category/Any")
    .then(response => response.json())
    .then(data => {
      this.setState({
        loading: false,
        joke: data
      })
    })
  }

  handleClick() {
    this.getJoke()
  }

  componentDidMount() {
    this.setState({loading:true})
    this.getJoke()
  }

  render() {
    let joke, delivery = ''
    if(this.state.joke.type === 'single') {
      joke = this.state.joke.joke
    } else if(this.state.joke.type === 'twopart') {
      joke = this.state.joke.setup
      delivery = this.state.joke.delivery
    }

    const text = this.state.loading ? "loading..." : joke

    return (
      <div className='jokeBox'>
        <h1>{text}</h1>
        <h1>{delivery}</h1>
        <div className='btnBox'>
          <button onClick={this.handleClick}>Random joke</button>
        </div>
      </div>
    )
  }
}


export default App;
