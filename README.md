# JM Techno

Liens courts pour les activités de technologie et Classe calme, publiés sur GitHub Pages.

- `jmtechno.fr/301` → activité 01 de 3e.
- `jmtechno.fr/403` → activité 03 de 4e.
- `jmtechno.fr/b301` → bonus 01 de 3e.
- `jmtechno.fr/cc` → Classe calme personnel.
- `jmtechno.fr/proj` → Classe calme Projection, pour les collègues.

`/calme` et `/projection` fonctionnent aussi. L’accueil permet de saisir un code.

Les liens renvoient vers les pages GitHub existantes. La liaison Classe calme conserve son fonctionnement. Les activités ne sont pas déplacées, les droits professeur ne changent pas. Ce site n’enregistre aucune réponse et n’utilise ni compte, ni suivi de visites.

## Mettre à jour les liens

Modifier `links.json` pour les activités, `shortcuts.json` pour Classe calme. Les destinations autorisées sont limitées au labo techno et aux deux versions de Classe calme.

Lancer `node scripts/build.mjs`, vérifier les fichiers générés puis pousser sur `main`. Le workflow publie `public/` automatiquement. Chaque lien dispose d’un lien cliquable et d’une redirection fonctionnant aussi sans JavaScript.

## Domaine OVH

Dans les réglages Pages du dépôt, le domaine personnalisé doit être `jmtechno.fr`. Le fichier `public/CNAME` documente ce choix ; le réglage Pages reste nécessaire avec GitHub Actions.

Chez OVH, dans **jmtechno.fr → Zone DNS** :

| Type | Sous-domaine | Cible |
| --- | --- | --- |
| A | vide | 185.199.108.153 |
| A | vide | 185.199.109.153 |
| A | vide | 185.199.110.153 |
| A | vide | 185.199.111.153 |
| CNAME | www | jean-marie-cardoso.github.io. |

Remplacer l’ancien A de stationnement `213.186.33.5` sur le domaine et sur `www`. Un CNAME `www` remplace ses anciens A/TXT de stationnement. Garder les enregistrements MX et SPF de la messagerie, ainsi que les serveurs DNS OVH. Le TXT de redirection de stationnement `1|www.jmtechno.fr` peut être retiré.

La protection DNSSEC reste gérée chez OVH. Aucune modification des serveurs DNS n’est nécessaire.

Lorsque les DNS sont publiés et le certificat GitHub prêt, activer **Enforce HTTPS** dans les réglages Pages. La génération du certificat peut prendre jusqu’à 24 h. Le domaine n’est opérationnel qu’après ces vérifications.

Sources : [DNS GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [zone DNS OVH](https://docs.ovhcloud.com/en/guides/web-cloud/domains/dns-zone-edit).
