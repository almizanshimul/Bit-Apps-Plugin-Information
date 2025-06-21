const bitPlugins = ["bit-form", "bit-integrations", "bit-assist", "bit-social", "bit-pi", "bit-smtp", "file-manager"]

let cardParent = document.getElementById("cardParent")
let bitTotalReview = 0;
let bitFiveStarReview = 0;
let bitTotalActive = 0;
let bitTotalDownload = 0;


bitPlugins.forEach((plugin) => {
    let url = `https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&request[slug]=${plugin}&request[fields][icons]=true&request[fields][downloaded]=true`
    fetch(url)
        .then(response => response.json())
        .then(json => {
            let name = json.slug.replace("-", " ")
            let img = json.icons["1x"]
            let totalReview = json.num_ratings
            let fiveStarReview = json.ratings[5]
            let totalActive = json.active_installs
            let totalDownload = json.downloaded

            bitTotalReview += totalReview
            bitFiveStarReview += fiveStarReview
            bitTotalActive += totalActive
            bitTotalDownload += totalDownload

            let boxContent = ` <div class="box">
            <img src=${img} alt=${name} width="80" height="80">
                    <div class="text-content">
                        <h2>${name}</h2>
                        <p>Total Review: ${totalReview}</p>
                        <p>5Star Review: ${fiveStarReview}</p>
                        <p>Total Active: ${totalActive}</p>
                        <p>Total Download: ${totalDownload}</p>
                    </div>
                    </div>
                    `
            cardParent.innerHTML += boxContent


            document.getElementById("review").innerHTML = bitTotalReview
            document.getElementById("fiveReview").innerHTML = bitFiveStarReview
            document.getElementById("active").innerHTML = bitTotalActive
            document.getElementById("download").innerHTML = bitTotalDownload
            document.getElementById("shortActive").innerHTML = ", " + formatNumber(bitTotalActive)
            document.getElementById("shortDownload").innerHTML = ", " + formatNumber(bitTotalDownload)


        })
})


function formatNumber(num) {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(2) + 'B';
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(2) + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(2) + 'K';
    } else {
        return num.toString();
    }
}