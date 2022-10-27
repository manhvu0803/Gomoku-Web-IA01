class Square extends React.Component {
	shouldComponentUpdate(nextProps) {
	 	return (this.props.value != nextProps.value) || (this.props.highlight != nextProps.highlight);
	}

	render() {
		return (
			<button className={`Square${this.props.highlight? " highlight" : ""}`} onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		)
	}
}