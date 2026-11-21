const myInfo = new URLSearchParams(window.location.search);

console.log(myInfo.get('first-name'));
console.log(myInfo.get('last-name'));
console.log(myInfo.get('email'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('organization-name'));
console.log(myInfo.get('timestamp'));

document.querySelector('#results').innerHTML = `
<p>Full Name: ${myInfo.get('first-name')} ${myInfo.get('last-name')}</p>
<p>Email: ${myInfo.get('email')}</p>
<p>Phone Number: ${myInfo.get('phone')}</p>
<p>Organization Name: ${myInfo.get('organization-name')}</p>
<p>Submission Time: ${myInfo.get('timestamp')}</p>
`