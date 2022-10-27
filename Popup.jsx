class Popup extends React.Component {
	constructor(props) {
		super(props);

		this.state =  {
			closed: false
		}
	}

	render() {
		let className = (!this.state.closed)? "overlay" : "overlayClosed";

		return (
			<div className={className} id="mainPopup">
				<div className="popup">
					<h2>{this.props.header}</h2>
					<a className="close" onClick={() => this.onClose()}>&times;</a>
					<div className="content">{this.props.content}</div>
				</div>
			</div>
		)
	}

	onClose() {
		this.setState({ closed: true });
	}
}