
	<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="animation" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stop-color="#1f2937" stop-opacity="0" />
				<stop offset=".5" stop-color="#1f2937">
					<animate attributeName="offset" values="0;1;0;" dur="2s" repeatCount="indefinite" />
				</stop>
				<stop offset="1" stop-color="#1f2937" stop-opacity="0" />
				<animateTransform
					attributeName="gradientTransform"
					type="rotate"
					values="360 .5 .5;0 .5 .5"
					class="ignore"
					dur="10s"
					repeatCount="indefinite"
				/>
			</linearGradient>
		</defs>
		<path id="square" fill="url(#animation)" d="M128 0H0V128H128V0Z" />
		<path
			id="text"
			d="M78.224 39.622L70.208 15.529L66.355 26.868H70.687L72.253 32.315H64.627L62.103 39.622H55.017L66.886 8.001H73.175L85.044 39.622H78.224V39.622ZM46.611 38.603C44.573 39.284 42.271 39.622 39.702 39.622H28.984V20.961H35.583V33.997H39.835C41.547 33.997 43.008 33.753 44.219 33.267C45.43 32.779 46.411 32.079 47.165 31.163C47.917 30.247 48.471 29.164 48.825 27.909C49.18 26.653 49.357 25.244 49.357 23.679C49.357 22.143 49.202 20.747 48.892 19.493C48.582 18.238 48.087 17.183 47.408 16.327C46.728 15.471 45.85 14.807 44.773 14.333C43.829 13.92 42.665 13.722 41.348 13.668H14.599V20.911H23.501V26.58H14.599V39.622H8V8H28.984H41.991C46.263 8.203 49.649 9.535 52.125 11.942C54.826 14.569 56.177 18.467 56.177 23.634C56.177 26.261 55.801 28.565 55.048 30.542C54.295 32.521 53.209 34.189 51.792 35.547C50.375 36.906 48.648 37.924 46.611 38.603Z"
		/>
	</svg>

