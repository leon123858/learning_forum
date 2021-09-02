/*
headerName:左上角icon
*/
const headerName =
    `
<a class="navbar-brand col-md-5" href="http://140.116.183.54:1337/">
    <div class="row ">
        <div class="d-none d-md-inline col-md-2 p-1">
            <img src="/images/Logo.png" class="w-100" alt="">
        </div>
        <div class="col-md-10 my-auto"> 
            <strong>高中教師社會科學增能平台</strong><br> <strong>UFO Teacher Empowerment Platform</strong>
        </div>
    </div>
</a>
`
const headerDiv = document.getElementById("headerDiv");
headerDiv.insertAdjacentHTML('afterbegin', headerName);