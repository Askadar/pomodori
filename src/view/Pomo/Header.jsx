import React from 'react';

const Header = () =>
<header>
	<h1>Pomodori - your productivity timer</h1>
	<h4 className="right">InDev edition! V:  {process.env.REACT_APP_VERSION}</h4>
</header>;

export default Header
