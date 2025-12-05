import { Octokit } from "octokit"

const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN })

export async function getProjetos() {
    const username = process.env.REACT_APP_GITHUB_USERNAME
    
    // 1) Buscar os repositórios
    const { data: repos } = await octokit.request("GET /user/repos", {
        visibility: "all",
        affiliation: "owner",
        per_page: 100,
        sort: "pushed"
    })
    
    // 2) Tratar os dados
    if (!repos || repos.length === 0) return []
    
    const deleteRepositories = ['portfolio', 'davidhscruz', 'escala', 'projetos']
    
    const projetos = repos.map( repo => {
        if (deleteRepositories.some( delRepo => repo.name.toLowerCase().startsWith(delRepo.toLowerCase()) )) return null

        return {
            id: repo.id,
            name: repo.name,
            description: repo.description || "Sem descrição",
            tags: repo.topics.map(tag => tag.toUpperCase()),
            image: repo.private ? null : `https://raw.githubusercontent.com/${username}/${repo.name}/refs/heads/main/public/assets/images/capa.png`,
            language: repo.language,
            url: repo.private ? null : repo.html_url,
            private: repo.private,
            homepage: repo.private ? null : repo.homepage,
            updated_at: repo.updated_at,
        }
    })

    return projetos.filter(proj => proj !== null)
}