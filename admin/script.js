(() => {
 const original=JSON.parse(JSON.stringify(window.SAMGROWTH_CONFIG||{company:{},projects:[]})),draft=localStorage.getItem('samgrowth-admin-draft');
 let state=draft?JSON.parse(draft):original;
 const $=id=>document.getElementById(id), notice=message=>{$('notice').textContent=message;setTimeout(()=>$('notice').textContent='',3500)};
 const fields={name:$('company-name'),email:$('company-email'),foundedYear:$('company-year'),tagline:$('company-tagline'),description:$('company-description')};
 const syncCompany=()=>Object.entries(fields).forEach(([key,input])=>state.company[key]=key==='foundedYear'?Number(input.value):input.value.trim());
 const renderCompany=()=>Object.entries(fields).forEach(([key,input])=>input.value=state.company?.[key]??'');
 const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
 function renderProjects(){
   $('project-list').innerHTML=state.projects.map((p,index)=>`<article class="project-editor" data-index="${index}"><div class="project-editor-head"><strong>Projeto ${index+1}</strong><button class="remove-project" type="button">Remover</button></div><div class="form-grid">
   <label>Nome<input data-key="name" value="${escapeHTML(p.name)}"></label><label>Iniciais<input data-key="initials" maxlength="3" value="${escapeHTML(p.initials)}"></label>
   <label>Categoria<input data-key="category" value="${escapeHTML(p.category)}"></label><label>Ano<input data-key="year" type="number" value="${escapeHTML(p.year)}"></label>
   <label>Status<input data-key="status" value="${escapeHTML(p.status)}"></label><label>Cor<select data-key="color">${['teal','blue','violet','gold'].map(c=>`<option ${p.color===c?'selected':''} value="${c}">${c}</option>`).join('')}</select></label>
   <label class="full">Link<input data-key="url" type="url" value="${escapeHTML(p.url)}"></label><label class="full">Descrição<textarea data-key="description" rows="3">${escapeHTML(p.description)}</textarea></label></div></article>`).join('');
 }
 $('project-list').addEventListener('input',event=>{const card=event.target.closest('.project-editor');if(!card)return;const key=event.target.dataset.key;state.projects[Number(card.dataset.index)][key]=key==='year'?Number(event.target.value):event.target.value});
 $('project-list').addEventListener('click',event=>{if(!event.target.classList.contains('remove-project'))return;state.projects.splice(Number(event.target.closest('.project-editor').dataset.index),1);renderProjects()});
 $('add-project').addEventListener('click',()=>{state.projects.push({name:'Novo projeto',initials:'NP',category:'Finanças · Tecnologia',description:'Descreva aqui o propósito e a atuação deste projeto.',year:new Date().getFullYear(),status:'Em desenvolvimento',url:'https://',color:'teal'});renderProjects()});
 $('save-draft').addEventListener('click',()=>{syncCompany();localStorage.setItem('samgrowth-admin-draft',JSON.stringify(state));notice('Rascunho salvo neste navegador.')});
 $('reset').addEventListener('click',()=>{if(!confirm('Restaurar os dados originais do config.js?'))return;state=JSON.parse(JSON.stringify(original));localStorage.removeItem('samgrowth-admin-draft');renderCompany();renderProjects();notice('Dados restaurados.')});
 $('download').addEventListener('click',()=>{syncCompany();const content='/* Gerado pelo editor da SamGrowthLabs */\nwindow.SAMGROWTH_CONFIG = '+JSON.stringify(state,null,2)+';\n';const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([content],{type:'text/javascript;charset=utf-8'}));link.download='config.js';link.click();URL.revokeObjectURL(link.href);notice('config.js baixado. Substitua o arquivo atual por ele.')});
 renderCompany();renderProjects();
})();