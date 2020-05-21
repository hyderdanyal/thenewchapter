import React from 'react'
import Typed from 'typed.js'


export default class TypedR extends React.Component {








	componentDidMount() {

		const { strings } = this.props;


		var typed = new Typed(this.el, {
			/**
			 * @property {array} strings strings to be typed
			 * @property {string} stringsElement ID of element containing string children
			 */
			strings: strings,
			stringsElement: null,

			/**
			 * @property {number} typeSpeed type speed in milliseconds
			 */
			typeSpeed: 50,

			/**
			 * @property {number} startDelay time before typing starts in milliseconds
			 */
			startDelay: 0,

			/**
			 * @property {number} backSpeed backspacing speed in milliseconds
			 */
			backSpeed: 50,

			/**
			 * @property {boolean} smartBackspace only backspace what doesn't match the previous string
			 */
			smartBackspace: true,

			/**
			 * @property {boolean} shuffle shuffle the strings
			 */
			shuffle: false,

			/**
			 * @property {number} backDelay time before backspacing in milliseconds
			 */
			backDelay: 700,

			/**
			 * @property {boolean} fadeOut Fade out instead of backspace
			 * @property {string} fadeOutClass css class for fade animation
			 * @property {boolean} fadeOutDelay Fade out delay in milliseconds
			 */
			fadeOut: false,
			fadeOutClass: 'typed-fade-out',
			fadeOutDelay: 500,

			/**
			 * @property {boolean} loop loop strings
			 * @property {number} loopCount amount of loops
			 */
			loop: true,
			loopCount: Infinity,

			/**
			 * @property {boolean} showCursor show cursor
			 * @property {string} cursorChar character for cursor
			 * @property {boolean} autoInsertCss insert CSS for cursor and fadeOut into HTML <head>
			 */
			showCursor: true,
			cursorChar: '|',
			autoInsertCss: true,

			/**
			 * @property {string} attr attribute for typing
			 * Ex: input placeholder, value, or just HTML text
			 */
			attr: null,

			/**
			 * @property {boolean} bindInputFocusEvents bind to focus and blur if el is text input
			 */
			bindInputFocusEvents: false,

			/**
			 * @property {string} contentType 'html' or 'null' for plaintext
			 */
			contentType: 'html',

			/**
			 * Before it begins typing
			 * @param {Typed} self
			 */
			onBegin: (self) => { },

			/**
			 * All typing is complete
			 * @param {Typed} self
			 */
			onComplete: (self) => { },

			/**
			 * Before each string is typed
			 * @param {number} arrayPos
			 * @param {Typed} self
			 */
			preStringTyped: (arrayPos, self) => { },

			/**
			 * After each string is typed
			 * @param {number} arrayPos
			 * @param {Typed} self
			 */
			onStringTyped: (arrayPos, self) => { },

			/**
			 * During looping, after last string is typed
			 * @param {Typed} self
			 */
			onLastStringBackspaced: (self) => { },

			/**
			 * Typing has been stopped
			 * @param {number} arrayPos
			 * @param {Typed} self
			 */
			onTypingPaused: (arrayPos, self) => { },

			/**
			 * Typing has been started after being stopped
			 * @param {number} arrayPos
			 * @param {Typed} self
			 */
			onTypingResumed: (arrayPos, self) => { },

			/**
			 * After reset
			 * @param {Typed} self
			 */
			onReset: (self) => { },

			/**
			 * After stop
			 * @param {number} arrayPos
			 * @param {Typed} self
			 */
			onStop: (arrayPos, self) => { },

			/**
			 * After start
			 * @param {number} arrayPos
			 * @param {Typed} self
			 */
			onStart: (arrayPos, self) => { },

			/**
			 * After destroy
			 * @param {Typed} self
			 */
			onDestroy: (self) => { }
		});


		// If you want to pass more options as props, simply add
		// your desired props to this destructuring assignment.
		// You can pass other options here, such as typing speed, back speed, etc.
		// const options = {
		// 	strings: ["Today a <strong>Reader</strong>", '&amp; tomorrow a <strong>Leader</strong>'],
		// 	typeSpeed: 50,
		// 	backSpeed: 50
		// };
		// this.el refers to the <span> in the render() method
		//this.typed = new Typed(this.el, options);
		typed.start()


	}

	componentWillUnmount() {
		// Make sure to destroy Typed instance on unmounting
		// to prevent memory leaks
		//this.typed.destroy();
	}

	render() {
		return (
			<div className="wrap" style={{
				width: "100%"


			}}>

				<div className="type-wrap">
					<span
						style={{
							whiteSpace: 'pre',
							color: "white"
						}}
						ref={(el) => { this.el = el; }}



					/>
				</div>

			</div>
		);
	}
}

