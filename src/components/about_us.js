import React from 'react';
import './about_us.css';

export default () => {
	return (
	<div className = 'devContainer'>
	<div className = 'row center black about-cont'>
				<div className = 'col s12 center white-text'>About Us</div>
			</div>
		<div className = "au-leftColumn">	
				<div>
					<div>let getDevJobTeam =&#x7b; </div>
    				<div className = "indent-1">dataType: 'json',</div>
    				<div className = "indent-1">url: 'http://getdevjob.com',</div>
    				<div className = "indent-1">method: 'get',</div>
    				<div className = "indent-1">success: displayTeam</div>
					<div>};</div>
				</div>
				<div> console.log(response);</div>
			<div className="jsonResponse"> &#x7b; team:
			 	<div>
					<div className = 'indent-1'>[&#x7b;</div>
						<div className = 'indent-2'>name: 'John Carlisle',</div>
						<div className = 'indent-2'>specialty: 'Front End',</div>
						<div className = 'indent-2'>linkedInURL: <a href = 'https://www.linkedin.com/in/john-carlisle-91777a68/'>https://www.linkedin.com/in/john-carlisle-91777a68/</a>,</div>
						<div className = 'indent-2'>gitHub: <a href = 'https://github.com/TremendousZ'>https://github.com/TremendousZ</a></div>
					<div className = 'indent-1'>},&#x7b;</div>
						<div className = 'indent-2'>name: 'Kris Chanthasiriphan',</div>
						<div className = 'indent-2'>specialty: 'Back End',</div>
						<div className = 'indent-2'>linkedInURL: <a href ='https://www.linkedin.com/in/kris-chanthasiriphan-500339121/'>https://www.linkedin.com/in/kris-chanthasiriphan-500339121/</a>,</div>
						<div className = 'indent-2'>gitHub: <a href = 'https://github.com/krischanthas'>https://github.com/krischanthas</a></div>
					<div className = 'indent-1'>},&#x7b;</div>
						<div className = 'indent-2'>name: 'Ryan Kang'',</div>
						<div className = 'indent-2'>specialty: 'Back End',</div>
						<div className = 'indent-2'>linkedInURL: <a href='https://www.linkedin.com/in/ryankang2/'>https://www.linkedin.com/in/ryankang2/ </a>,</div>
						<div className = 'indent-2'>gitHub: <a href ='https://github.com/ryankang2'>https://github.com/ryankang2</a></div>
					<div className = 'indent-1'>},&#x7b;</div>
						<div className = 'indent-2'>name: 'Jake Taylor',</div>
						<div className = 'indent-2'>specialty: 'Front End',</div>
						<div className = 'indent-2'>linkedInURL: <a href = 'https://www.linkedin.com/in/jacobcodes/'>https://www.linkedin.com/in/jacobcodes/</a>,</div>
						<div className = 'indent-2'>gitHub: <a href = 'https://github.com/Firecoded'>https://github.com/Firecoded</a></div>
					<div className = 'indent-1'>}]</div>
					<div>}</div>
				</div>
			</div>
		</div>
		<div className = "au-rightColumn">
			<div className = 'teamPhoto'>
				<img src='https://media.licdn.com/dms/image/C5603AQHaVjrk0vNAxw/profile-displayphoto-shrink_200_200/0?e=1541635200&v=beta&t=GSaF0B-7McSZkwWCpqc3fNEB7baYtSwVN-Il-khpZsE'/>
			</div>
			<div className = 'teamPhoto'>
				<img src ='https://media.licdn.com/dms/image/C5603AQE31GbE87TJnw/profile-displayphoto-shrink_800_800/0?e=1541635200&v=beta&t=mywM4QYzpy4LwwBinqjicSlG4AUVeF2nuV1vBOqP3L4'/>
			</div>
			<div className = 'teamPhoto'>
				<img src ='https://media.licdn.com/dms/image/C5603AQGG0afpi64SkQ/profile-displayphoto-shrink_800_800/0?e=1541635200&v=beta&t=TNZNl7VbhmxcZQ511M3YD71POUQOwOJ2-0VQVG9cctU'/>
			</div>
			<div className = 'teamPhoto'>
				<img src ='https://media.licdn.com/dms/image/C5603AQFIA6pBVFWmlg/profile-displayphoto-shrink_800_800/0?e=1541635200&v=beta&t=uY1E9HxXYOHDtMWQ5mF1bK4ybeqJrlTfO7jAsysXdZ4'/>
			</div>
		</div>	
		</div>
	)
}
