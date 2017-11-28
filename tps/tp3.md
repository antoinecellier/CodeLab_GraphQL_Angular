## TP3 : Modification et utilisation du cache / store

Lors de l’envoi d’un message, deux requêtes sont envoyées au serveur. La première envoie le message tandis que la seconde “refetch” les données pour les mettre à jour. Si on regarde de plus près le contenu de la première requête on remarquera qu’il contient le message envoyé avec le status “OK” en réponse (acquittement du message). Une optimisation possible va être d’ajouter le message reçu directement dans le store sans envoyer une nouvelle requête au serveur pour récupérer tous les messages. Ainsi le message envoyé s’affichera lorsque l'acquittement sera reçu.

Pour se faire nous allons utiliser une autre propriété offerte par mutate. C’est la propriété  `update` qui va vous permettre d’aller directement écrire dans le store des données. Ici l’objectif va donc être d’aller ajouter dans le store le message reçu par l'acquittement de la requête d’envoi de message. Une fois ajouté dans le store, l’IHM sera automatiquement mis à jour grâce au `watchQuery` réalisé dans le `getMessage`.

La propriété update attend pour valeur une fonction de la forme suivante : `(store, receivedData) => {[VOTRE CODE]}`

Le premier argument est un objet qui vous permettra d’accéder au store tandis que le second argument correspond aux données reçu par la requête. La fonction est un fonction callback automatiquement exécuté par apollo une fois la requête de mutation terminé. Vous n’avez donc pas à vous soucier de renseigner ces paramètres, apollo s’en charge pour vous.

L’objet store possède deux fonctions qui vont nous interesser :

 - `readQuery` : Permet d'accéder au store via la requête graphql voulu.
 - `writeQuery` : Permet d'écrire dans le store des résultats pour une requête donnée. Avec cette fonction vous allez en quelques sortes simuler la réponse.

Aidez vous du lien suivant pour utilisé la propriété update dans votre code : https://www.apollographql.com/docs/angular/features/caching.html#updating-the-cache-after-a-mutation

