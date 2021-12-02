
// google api key: AIzaSyBFFbyG0U01RiiS861nQR5fgh3RFREwpNk

function setup(juna) {
    //Luodaan tarvittavat asiat tiedon hakua varten.
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://rata.digitraffic.fi/api/v1/train-locations/latest/" + juna, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 1) {
        console.log("venaa");
    }

    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // etsitään junan koordinaatit ja lähetetään ne eteenpäin initMap2 funktiolle
        console.log(xmlhttp);
        console.log(xmlhttp.responseText);
        jsonObj = JSON.parse(xmlhttp.responseText);
        console.log(jsonObj[0].location.coordinates[0]);
        lon = jsonObj[0].location.coordinates[0];
        console.log(jsonObj[0].location.coordinates[1]);
        lat = jsonObj[0].location.coordinates[1];
        initMap2(lat, lon);
    }
}
}

function initMap2(lat, lon) {
    //laitetaan kartta junan päälle ja luodaan nuppineula siihen kohtaan
    const juna = { lat: lat, lng: lon };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: juna,
    });
    const marker = new google.maps.Marker({
      position: juna,
      map: map,
    });
}

function initMap() {
    // Ladataan kartta joka osoittaa Helsingin päärautatieasemalle. Ladataan kartta heti, jotta näytöllä on jotain katseltavaa
    const hkipra = { lat: 60.1718, lng: 24.9414 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: hkipra,
    });
    // Ladataan nuppineula joka osoittaa rautatieasemalle
    const marker = new google.maps.Marker({
      position: hkipra,
      map: map,
    });
}

document.addEventListener("click", e => {
    if (e.target && e.target.id == "lähetä") {
        //Haetaan tekstinsyöttökennän arvo ja lähetetään se Setup() funktiolle.
        var j = document.getElementById("juna").value;
        setup(j);
    }
})

function aktiivisetJunat (){
    // Tämä suoritetaan ensimmäisenä kun sivu aukeaa, jotta käyttäjä voi katsoa listasta jonkun aktiivisen junan numeron.
    // Luodaan tarvittavat asiat tiedon hakua varten.
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://rata.digitraffic.fi/api/v1/train-locations/latest/", true);
    xmlhttp.send();
    //tarkistetaanko onko tieto tullut takaisin
    xmlhttp.onreadystatechange = function(){

    
    if(xmlhttp.readyState == 1) {
        console.log("venaa");
    }

    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //Luodaan muuttuja list johon tungetaan p elementtejä, jotka tyylittelyn avulla on laitettu menemään samalle riville.
        document.getElementsByClassName("p").innerHTML = "";
        var list = document.createElement("p");
        //muutetaan takaisin tullut tieto taulukoksi. Piti käyttää .responseText, koska digitraffic ei palauttanut xml tietoa.
        jsonObj = JSON.parse(xmlhttp.responseText);
        for (i = 0; i<jsonObj.length; i++){
            //listataan arvot koko taulukosta ja laitetaan jokaisen arvon väliin välilyönti
            console.log(jsonObj[i].trainNumber);
            let item = document.createElement("p");
            let väli = document.createElement("p");
            item.innerHTML = jsonObj[i].trainNumber;
            väli.innerHTML = " ";
            //tungetaan tiedot edellisen perään
            list.appendChild(item);
            list.appendChild(väli);
        }
        //tungetaan tiedot diviin jonka id on testi
        document.getElementById("testi").appendChild(list);
        }
    }
}