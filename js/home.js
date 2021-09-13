const handleSaveTeam = () => {
    const teamName = document.getElementById('team-name');
    const teamCategory = document.getElementById('team-category');
    const currentUser = GlobalStorage().getItem('currentUser');
    const newTeam = {
        teamId: new Date().getTime(),
        teamName: teamName.value,
        teamCategory: teamCategory.value,
        admin: currentUser.user.email,
        adminName: currentUser.user.fullName,
        members: []
    }
    const prevTeam = GlobalStorage().getItem('allTeams');
    if (prevTeam) {
        const saveTeam = [...prevTeam, newTeam];
        GlobalStorage().saveItem('allTeams', saveTeam);
    } else {
        const saveTeam = [newTeam];
        GlobalStorage().saveItem('allTeams', saveTeam);
    }
    document.getElementById('team-modal-close').click();
    getAllTeams();
};
const handleTeamDelete = (teamId) =>{
    const allTeams = GlobalStorage().getItem('allTeams');
    const selectedTeamIndex = allTeams.findIndex((singleTeam)=> teamId === singleTeam.teamId);
    if(selectedTeamIndex > -1){
        allTeams.splice(selectedTeamIndex,1);
        GlobalStorage().saveItem('allTeams',allTeams);
        getAllTeams();
    }
}
const getAllTeams = () => {
    const allTeams = GlobalStorage().getItem('allTeams');
    const currentUser = GlobalStorage().getItem('currentUser');
    document.getElementById('teams-you-own').innerHTML = '';
    if(allTeams.length === 0 || !allTeams){
        document.getElementById('teams-you-part').innerHTML = '<h3 class="text-center">You Do Not Have Any Team</h3>';
         document.getElementById('teams-you-own').innerHTML = '<h3 class="text-center">You Do Not Have Any Team</h3>';
         return
       
    }
    allTeams.forEach(team => {
        if (team.admin === currentUser.user.email) {
            document.getElementById('teams-you-own').innerHTML += `
            <div class="col-sm-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${team.teamName}</h5>
                                        <p class="card-text"><b>Team Type:</b> ${team.teamCategory}</p>
                                        <p class="card-text"><b>Members:</b></p>
                                        <button href="#"  class="btn btn-primary">Show Details</button>
                                        <button href="#" onclick="handleTeamDelete(${team.teamId})" class="btn btn-outline-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
            `
        } else if (team.members.includes(currentUser.user.email)) {
            document.getElementById('teams-you-part').innerHTML += `
            <div class="col-sm-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${team.teamName}</h5>
                                        <p class="card-text"><b>Team Type:</b> ${team.teamCategory}</p>
                                        <p class="card-text"><b>Members:</b></p>
                                        <button href="#" class="btn btn-primary">Show Details</button>
                                    </div>
                                </div>
                            </div>
            `
        }

    });
}
getAllTeams();