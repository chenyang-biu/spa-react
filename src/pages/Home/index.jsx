import React from 'react'
import { pick } from 'lodash/fp'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Input, Button } from 'antd'
import classes from './home.less'


@connect(pick(['todo']))
export default class Home extends React.Component {
  static propTypes = {
    todo: PropTypes.shape({
      list: PropTypes.array,
      byId: PropTypes.object,
    }),
  }

  static defaultProps = {
    todo: {
      byId: {},
      list: [],
    },
  }

  state = {
    tmpTodo: {
      content: undefined,
      header: undefined,
    },
  }

  handleHeader = e => {
    this.setState({
      tmpTodo: {
        header: e.target.value,
      },
    })
  }

  render() {
    const { list } = this.props.todo

    return (
      <div>
        <h1 className={classes.green}> Hello world </h1>
        <Input
          type="text"
          value={this.state.tmpTodo.header}
          onChange={this.handleHeader}
        />

        <Button>敲里吗</Button>
        <ul>
          {!!list.length &&
            list.map(todo => <li key={todo.id}>{todo.content}</li>)}
        </ul>
      </div>
    )
  }
}
