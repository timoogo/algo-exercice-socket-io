# algo-exercice-socket-io

## Auteurs

* [**@Maxime Attala**](https://github.com/sverker92)
* [**@Timothée Gaultier**](https://github.com/timoogo)

## Description
Ce projet avait pour but de créer une application web en utilisant les websockets. 
Cette application permet de créer des salles de chat et de discuter avec les autres utilisateurs connectés à la même salle. Il est possible de sélectionner un restaurant / utilisateur pour aller manger ensemble et convenir d'un point de rendez-vous.
Nous avons utilisé le framework [**socket.io**](https://socket.io/).

## Installation

### Prérequis

[**Node.js**](https://nodejs.org/en/) doit être installé sur la machine.
[**ngrok**](https://ngrok.com/) si besoin de host.


1. Cloner le projet dans un dossier local.

```bash
    git clone https://github.com/timoogo/algo-exercice-socket-io.git
```
1. Se placer dans le dossier du projet.

```bash
    cd algo-exercice-socket-io/
```

### Server side

1. Se placer dans le dossier du serveur.

```bash
    cd resto-server/
```

1. Installer les dépendances.

```bash
    npm install
```


1. Lancer le serveur.

```bash
   npm run dev:server
```


### Client side

1. Se placer dans le dossier du client.

```bash
    cd ../resto-client/
```

1. Installer les dépendances.

```bash
    npm install
```


1. Lancer le client.

```bash
   npm run dev:client
```
*Note: Si besoin d'un port spécifique, on peut le spécifier en paramètre: `npm run dev -- --port 8000`*

1. Lancer ngrok si besoin de host.

```bash
   ngrok http PORT # PORT = 5173 par défaut
```

1. Ouvrir le navigateur à l'adresse `http://localhost:5173/` ou `http://localhost:PORT/` si un port spécifique a été spécifié.


## Fonctionnalités

### Markers sur la carte

* **Bleu**: Position de l'utilisateur
* **Rouge**: Point de rendez-vous draggable par tout les utilisateurs connectés à la salle
* **Vert**: Restaurant sélectionné par l'utilisateur
* **Jaune**: Restaurant sélectionné par un autre utilisateur.

### Rooms
A l'ouverture de l'application, l'utilisateur doit remplir un formulaire pour choisir une room. 
Il y a 100 rooms possibles, de 0 à 99.

### Chat

* L'utilisateur peut discuter avec les autres utilisateurs connectés à la même room.
* On voit en temps réel les messages envoyés par les autres utilisateurs.
* On voit également les utilisateurs connectés à la room.
* Le temps entre l'utilisateur et le point de rendez-vous est affichée en temps réel en haut à droite de l'écran.

### Restaurants

* L'utilisateur peut sélectionner un restaurant sur la carte.
*La liste des restaurants change sur la carte le choix de l'utilisateur.