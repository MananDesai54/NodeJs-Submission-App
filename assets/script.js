const links = document.querySelector('.links');

function getData(api='getData') {
    fetch(`https://submissionlinks.herokuapp.com/api/${api}`)
    // fetch(`http://localhost:5000/api/${api}`)
    .then(res=>res.json())
    .then(data=>{
        if(data.length===0) {
            const h1 = document.createElement('h1');
            h1.style.textAlign = 'center';
            h1.textContent = 'NO DATA';
            links.appendChild(h1);
        }else {
            data.forEach(link=>{
                const card = document.createElement('div');
                const cardContent = document.createElement('div');
                card.classList.add('card');
                cardContent.classList.add('card-content');
                cardContent.style = "overflow: hidden;text-overflow:ellipsis;white-space:nowrap;position:relative";
                // <i class="material-icons" style="position:absolute;top:10px;right:10px;cursor:pointer;">edit</i>
                cardContent.innerHTML = `
                    <span class="card-title" style="font-size: 20px;font-weight:bold;text-transform:uppercase;">
                        ${link.title} 
                    </span>
                    
                    <a href=${link.link} target="_blank">
                        ${link.link} 
                    </a>
                    <p>
                        Due  ${moment(link.dueDate+'T'+link.dueTime).fromNow()} 
                    </p>
                    <p>
                        Format = ${link.nameFormat} . ${link.fileType}
                    </p>
                    <p>
                        ${link.note} 
                    </p>
                    
                `;
                // <form action="/api/delete-link" method="POST">
                //         <input type="hidden" name="id" value=${link.id} />
                //         <button class="btn red waves-effect light-waves" style="margin-top:10px;" type="submit">
                //             Delete
                //         </button>
                //     </form>
                if(api==='getEmail') {
                    cardContent.innerHTML = `
                    <span class="card-title" style="font-size: 20px;font-weight:bold;text-transform:uppercase;">
                        ${link.title} 
                    </span>
                    <a href=mailto:${link.link}" target="_blank" style="display:flex;align-items:center;">
                        ${link.link}${'  '}<i class="material-icons" style="margin-left:10px;">send</i>
                    </a>
                `;
                }
                card.appendChild(cardContent);
                links.appendChild(card);
            })
        }
    })
    .catch(err=>console.log(err))
}

$(document).ready(function(){
    $('select').formSelect();
    getData();
});

$('.showType').click((e)=>{
    if(e.target.id === 'links') {
        $('.showType #links').addClass('selected');
        $('.showType #emails').removeClass('selected');
        links.innerHTML = '';
        getData();
    }else if(e.target.id === 'emails') {
        $('.showType #emails').addClass('selected');
        $('.showType #links').removeClass('selected');
        links.innerHTML = '';
        getData('getEmail');
    }
})

const addBtn = document.querySelectorAll('.add');
const addLink = document.getElementById('addLink');
const back = document.querySelector('.back');

addBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        addLink.style.transform = 'none';
        addLink.style.opacity = 1;
        addLink.style.zIndex = 1000000;
        back.style.zIndex = 998;
        addLink.style.transition = 'all 400ms ease';
        back.style.transition = 'all 400ms ease';
        back.style.opacity = 1;
    })
});
back.addEventListener('click',(e)=>{
    if(e.target.id !== 'addLink' && e.target.parentElement.id!=='addLink' && e.target.parentElement.parentElement.id!=='addLink') {
        addLink.style.transform = '-100vh';
        addLink.style.opacity = 0;
        addLink.style.zIndex = -10;
        back.style.zIndex = -10;
        back.style.opacity = 0;
    }
});
$('#close').click(()=>{
    addLink.style.transform = '-100vh';
    addLink.style.opacity = 0;
    addLink.style.zIndex = -10;
    back.style.zIndex = -10;
    back.style.opacity = 0;
})
$('select').change((e)=>{
    $('#link').css('display','block');
    if(e.target.value === 'email') {
        $('#link').attr('type','email');
        $('#link').attr('placeholder','abc@xyz.com');
        $('#link').val('');
        $('#dueDate').css('display','none');
        $('#dueTime').css('display','none');
        $('#nameFormat').css('display','none');
        $('#fileType').css('display','none');
        $('#note').css('display','none');
    }
    else if(e.target.value === 'link') {
        $('#link').attr('type','url');
        $('#link').attr('placeholder','https://example.com');
        $('#link').val('');
        $('#dueDate').css('display','block');
        $('#dueTime').css('display','block');
        $('#nameFormat').css('display','block');
        $('#fileType').css('display','block');
        $('#note').css('display','block');
    }
    else if(e.target.value === 'moodle') {
        $('#link').attr('type','url');
        $('#link').val('https://egov.ddit.ac.in/index.php?r=site/login');
        $('#dueDate').css('display','block');
        $('#dueTime').css('display','block');
        $('#nameFormat').css('display','block');
        $('#fileType').css('display','block');
        $('#note').css('display','block');
    }
    else if(e.target.value === 'github') {
        $('#link').attr('type','url');
        $('#link').val('https://github.com/');
        $('#dueDate').css('display','block');
        $('#dueTime').css('display','block');
        $('#nameFormat').css('display','block');
        $('#fileType').css('display','block');
        $('#note').css('display','block');
    }
});