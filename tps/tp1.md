# TP : Propulsez votre application Angular avec GraphQL et Apollo

## TP1 : Récupérer et afficher des données avec GraphiQL

Dans ce premier TP nous allons récupérer les données misent à disposition par notre serveur via l’api graphql. Dans un premier temps visiter la page http://localhost:3000/api/graphql. 

Cette interface permet de réaliser des requêtes facilement vers le serveur. Sur l’écran en haut la droite, le bouton “Docs” permet d’explorer l’api. Dans “query” vous pourrez trouver les opérations de lecture, et dans “mutation” les opérations d’écriture.

Dans le champs de texte à gauche, vous allez pouvoir écrire vos requêtes graphql. 

Essayez la requête suivante :

```javascript
query {
  getMessages {
    sender {
      pseudo
      firstName
      lastName
    }
    content
    localisation
    date
    status
  }
}
```

Vous venez de récupérer tous les messages stockés actuellement par le serveur. Vous devez normalement trouver un seul message :

```javascript
{
  "data": {
    "getMessages": [
      {
        "sender": {
          "pseudo": "Canard Man",
          "firstName": "Frédéric",
          "lastName": "Molas"
        },
        "content": "Coin Coin",
        "localisation": "Duckpound",
        "date": 1507469434514,
        "status": "OK"
      }
    ]
  }
}
```

L’objectif de se premier TP va être d’écrire le code permettant à l’application Angular de récupérer les messages avec la requête que nous avons vu plus haut. Le code nécessaire est à écrire dans `tchat.service.ts`. Actuellement les messages sont écris en dur dans le code. Il faut donc à présent assigner correctement la valeur de la variable `message`. 

### TP1.1 : Mise en place d’apollo client dans le projet

Dans un premier temps il faut mettre en place l’utilisation du client Apollo dans Angular. Toutes les informations sont disponibles à l’adresse suivante : http://dev.apollodata.com/angular2/ . Afin d'accélérer la procédure, nous vous donnons à la suite de ce paragraphe les étapes à réaliser :

#### Etape 1 : Installer les package npm

Installer apollo-client, apollo-angular et graphql-tag sur votre projet : `npm install graphql apollo-client apollo-angular apollo-cache-inmemory apollo-angular-link-http graphql-tag --save`
 
#### Etape 2 : Mise en place du client Apollo

Dans la configuration de votre application, il va falloir fournir trois modules `ApolloModule`, `HttpLinkModule`, `HttpClientModule`. Ensuite, créer une instance d'apollo au démarrage de l'application. L’instanciation doit se faire ainsi dans `app.module.ts`.

```javascript
import { HttpClientModule } from '@angular/common/http'
import { ApolloModule, Apollo } from 'apollo-angular'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'

@NgModule({
  declarations: [...],
  imports: [
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    ...
  ],
  providers: [...],
  bootstrap: [...]
})
export class AppModule { 
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: 'api/graphql' }),
      cache: new InMemoryCache()
    })
  }
}
```

L’option `link` permet de signaler où angular devra envoyer une requête pour interroger le serveur graphql. Dans notre cas l’adresse est http://localhost:3000/api/graphql, mais un proxy bind toute requête ayant le pattern `/api/*` au port 3000. 

### TP1.2 : Envoi et récéption de la requête Apollo 

#### Etape 1 : Modification du service

Maintenant que la configuration Apollo est en place sur notre application angular, il va falloir modifier le `service tchat.service.ts` pour y injecter le service `Apollo` mise à disposition par `ApolloModule`.

```javascript
import { Apollo } from 'apollo-angular'
@Injectable()
export class TchatService {

   constructor(public apollo: Apollo) {}
   [...]
}
```

La variable `messages` n’a plus lieux d’être, supprimez la. Il faut à présent modifier la méthode `getMessages` pour envoyer une requête au serveur graphql. Cela peut être réalisé via l’objet `apollo` injecté plus haut et la méthode `query` qui prend en paramètre la requête à exécuter. Attention la requête doit être formatée pour être comprise par  l’objet `apollo`. Pour cette raison il existe une fonction de templating `gql`. Attention, nous vous conseillons de mettre votre requête dans une variable car dans la suite du TP elle sera réutilisée à différents endroits. Voici à quoi devrait ressembler votre méthode :

```javascript
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

@Injectable()
export class TchatService {
   [...]
   getMessages() {
       return this.apollo.query({
           query: gql`{
               [METTRE ICI VOTRE REQUÊTE]
           }`
       })
   }
}
```

#### Etape 2 : Modification du composant
Il ne reste plus qu'à modifier le composant pour afficher le résultat. La méthode `getMessages` du service retourne maintenant un `Observable`. Il y a donc plusieurs façons d’afficher les messages. Vous pouvez soit utiliser la pipe `async` mais cette méthode vous demandera de travailler le résultat de la requête au préalable, soit assigner le retour de la fonction `subscribe` dans une variable messages.

Le résultat retourné par la requête est un objet de la forme suivante :

```javascript
{
    data : {
        [nom_de_la_requete] : [résulat]
    }
}
```

