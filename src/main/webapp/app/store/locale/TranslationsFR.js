
Ext.define('Dashboard.store.locale.TranslationsFR', {
    extend: 'Ext.data.Store',
    alias: 'store.translationsFr',
    //asynchronousLoad: false,
    autoLoad: true,
    fields: [
        {
            msgid: 'msgid',
            type: 'string'
        }, {
            msgstr: 'msgstr',
            type: 'string'
        }, {
            name: 'msgctxt',
            type: 'string'
        }
    ],
    data: [
        "============== DIVERSE ==============",
        {
            "msgid": "Notifications",
            "msgstr": "Notifications"
        }, {
            "msgid": "Alert manager",
            "msgstr": "Responsable alerte"
        }, {
            "msgid": "Alert computing module",
            "msgstr": "Calcul"
        },  {
            "msgid": "Alert type",
            "msgstr": "Objet de l'alerte"
        }, {
            "msgid": "Type",
            "msgstr": "Objet de l'alerte"
        },  {
            "msgid": "MATERIAL",
            "msgstr": "Article"
        },{
            "msgid": "Administration",
            "msgstr": "Administration"
        }, {
            "msgid": "Business",
            "msgstr": "Métier"
        }, {
            "msgid": "Consultation",
            "msgstr": "Consultation"
        }, {
            "msgid": "Management",
            "msgstr": "Gestion"
        }, {
            "msgid": "System",
            "msgstr": "Système"
        }, {
            "msgid": "About",
            "msgstr": "A propos de NexCap®"
        }, {
            "msgid": "Updates",
            "msgstr": "Mises à jour"
        }, {
            "msgid": "Support",
            "msgstr": "Support"
        }, {
            "msgid": "Settings",
            "msgstr": "Paramètres"
        }, {
            "msgid": "Filter results",
            "msgstr": "Résultat"
        }, {
            "msgid": "Type",
            "msgstr": "Type"
        }, {
            "msgid": "label",
            "msgstr": "désignation"
        }, {
            "msgid": "Not synchronized",
            "msgstr": "Non synchronisé"
        }, {
            "msgid": "Select files",
            "msgstr": "Sélectionnez des fichiers"
        }, {
            "msgid": "Language",
            "msgstr": "Langue"
        }, {
            "msgid": "Déconnexion",
            "msgstr": "Déconnexion"
        }, {
            "msgid": "La session a expiré, veuillez vous reconnecter.",
            "msgstr": "La session a expiré, veuillez vous reconnecter."
        }, {
            "msgid": "Info",
            "msgstr": "Info"
        }, {
            "msgid": "Close",
            "msgstr": "Fermer"
        }, {
            "msgid": "About NexCap",
            "msgstr": "A propos de NexCap"
        }, {
            "msgid": "User manual",
            "msgstr": "Manuel utilisateur"
        }, {
            "msgid": "Open",
            "msgstr": "Ouvrir"
        }, {
            "msgid": "Do you really want to delete this element ?",
            "msgstr": "Désirez-vous vraiment supprimer cet élément ?"
        }, {
            "msgid": "Labels",
            "msgstr": "Labels"
        }, {
            "msgid": "Links",
            "msgstr": "Liens"
        }, {
            "msgid": "Ok",
            "msgstr": "Ok"
        }, {
            "msgid": "Confirm password",
            "msgstr": "Confirmez le mot de passe"
        }, {
            "msgid": "Password not confirmed!",
            "msgstr": "La confirmation a échoué !"
        }, {
            "msgid": "New password must be different!",
            "msgstr": "Le nouveau mot de passe doit être différent !"
        }, {
            "msgid": "Empty fields will not be modified",
            "msgstr": "Les champs vides ne seront pas modifés"
        }, {
            "msgid": "Picture",
            "msgstr": "Image"
        }, {
            "msgid": "Photos",
            "msgstr": "Photos"
        }, {
            "msgid": "Validate",
            "msgstr": "Valider"
        }, {
            "msgid": "Refresh",
            "msgstr": "Rafraichir"
        }, {
            "msgid": "Expand All",
            "msgstr": "Tout développer"
        }, {
            "msgid": "Collapse All",
            "msgstr": "Tout refermer"
        }, {
            "msgid": "The operation has been done!",
            "msgstr": "L\'opération a bien été effectuée !"
        }, {
            "msgid": "Close dialog",
            "msgstr": "Fermer"
        }, {
            "msgid": "Expand panel",
            "msgstr": "Déployer"
        }, {
            "msgid": "Collapse panel",
            "msgstr": "Replier"
        }, {
            "msgid": "Click to collapse. CTRL/click collapses all others",
            "msgstr": "Cliquer pour replier. CTRL/clic replie tous les autres"
        }, {
            "msgid": "Click to expand. CTRL key collapses all others",
            "msgstr": "Cliquer pour deployer. La touche CTRL déploie tous les autres"
        }, {
            "msgid": "width",
            "msgstr": "largeur"
        }, {
            "msgid": "Lock",
            "msgstr": "Verrouiller"
        }, {
            "msgid": "Unlock",
            "msgstr": "Déverrouiller"
        }, {
            "msgid": "Please wait...",
            "msgstr": "Merci de patienter..."
        }, {
            "msgid": "Detail sheet",
            "msgstr": "Detail sheet"
        },
        "============== MATERIALS ==============",
        {
            "msgid": "Items administration",
            "msgstr": "Gestion des articles"
        }, {
            "msgid": "Item",
            "msgstr": "Article"
        }, {
            "msgid": "Items",
            "msgstr": "Articles"
        }, {
            "msgid": "Create an item",
            "msgstr": "Créer un article"
        }, {
            "msgid": "Edit an item",
            "msgstr": "Editer un article"
        }, {
            "msgid": "Code",
            "msgstr": "Code"
        }, {
            "msgid": "Ref. code",
            "msgstr": "Ref. code"
        }, {
            "msgid": "Ref. designation",
            "msgstr": "Ref. désignation"
        }, {
            "msgid": "Quantity counted",
            "msgstr": "Quantité comptée"
        },{
            "msgid": "Ref. description",
            "msgstr": "Ref. description"
        }, {
            "msgid": "Category",
            "msgstr": "Catégorie"
        }, {
            "msgid": "Address",
            "msgstr": "Adresse"
        }, {
            "msgid": "Assigned location",
            "msgstr": "Emplacement de référence"
        }, {
            "msgid": "Source address",
            "msgstr": "Adresse d'origine"
        }, {
            "msgid": "Destination address",
            "msgstr": "Adresse de destination"
        }, {
            "msgid": "Origin or Destination",
            "msgstr": "Provenance ou Destination"
        }, {
            "msgid": "Operator",
            "msgstr": "Opérateur"
        }, {
            "msgid": "Borrower",
            "msgstr": "Emprunteur"
        }, {
            "msgid": "Restorer",
            "msgstr": "Restituteur"
        }, {
            "msgid": "Last user",
            "msgstr": "Dernier utilisateur"
        }, {
            "msgid": "Use count",
            "msgstr": "Utilisations"
        }, {
            "msgid": "Availability date",
            "msgstr": "Date de disponibilité"
        }, {
            "msgid": "Calibration date",
            "msgstr": "Date d'étalonnage"
        }, {
            "msgid": "Add an item",
            "msgstr": "Ajouter un article"
        }, {
            "msgid": "Duplicate an item",
            "msgstr": "Dupliquer un article"
        }, {
            "msgid": "Delete an item",
            "msgstr": "Supprimer un article"
        }, {
            "msgid": "Edit an item",
            "msgstr": "Modifier un article"
        }, {
            "msgid": "Edit many items",
            "msgstr": "Modifier plusieurs articles"
        }, {
            "msgid": "Status",
            "msgstr": "Statut"
        }, {
            "msgid": "Source location",
            "msgstr": "Emplacement d'origine"
        }, {
            "msgid": "Last operation date",
            "msgstr": "Date de la dernière opération"
        }, {
            "msgid": "Last maintenance date",
            "msgstr": "Dernière maintenance"
        }, {
            "msgid": "Next maintenance date",
            "msgstr": "Prochaine maintenance"
        }, {
            "msgid": "Name",
            "msgstr": "Nom"
        }, {
            "msgid": "Assigned Address",
            "msgstr": "Adresse de stockage"
        }, {
            "msgid": "Current address",
            "msgstr": "Adresse actuelle"
        }, {
            "msgid": "Last Updated",
            "msgstr": "Dernière mise à jour"
        }, {
            "msgid": "Material use count",
            "msgstr": "Nombre d'utilisations"
        }, {
            "msgid": "Reset use count",
            "msgstr": "Remise à zéro"
        }, {
            "msgid": "Last update",
            "msgstr": "Dernière mise à jour"
        }, {
            "msgid": "Loading",
            "msgstr": "Téléchargement"
        }, {
            "msgid": "Uploading",
            "msgstr": "Téléversement"
        }, {
            "msgid": "Operation date",
            "msgstr": "Date de l'opération"
        }, {
            "msgid": "Last operation",
            "msgstr": "Dernière opération"
        }, {
            "msgid": "Do you really want to remove this code ?",
            "msgstr": "Désirez-vous vraiment supprimer ce code ?"
        }, {
            "msgid": "Folder",
            "msgstr": "Dossier"
        }, {
            "msgid": "Mixed",
            "msgstr": "Divers"
        }, {
            "msgid": "File",
            "msgstr": "Document"
        }, {
            "msgid": "Do you really want to duplicate ",
            "msgstr": "Désirez-vous vraiment dupliquer "
        }, {
            "msgid": "Unreadable or incorrect code",
            "msgstr": "Code illisible ou incorrect"
        }, {
            "msgid": "This code type already exists. Would you like to replace it?",
            "msgstr": "Ce type de code existe déjà. Voulez-vous remplacer le code ?"
        }, {
            "msgid": "Identification",
            "msgstr": "Identification"
        },
        "============== DETAIL ==============",
        {
            "msgid": "Items properties",
            "msgstr": "Propriétés d'articles"
        }, {
            "msgid": "References properties",
            "msgstr": "Propriétés de références"
        }, {
            "msgid": "Inherited items properties",
            "msgstr": "Propriétés d'articles héritées"
        }, {
            "msgid": "Inherited references properties",
            "msgstr": "Propriétés de références héritées"
        }, {
            "msgid": "Characteristic",
            "msgstr": "Caractéristiques"
        }, {
            "msgid": "Material properties",
            "msgstr": "Propriétés d'articles"
        }, {
            "msgid": "Inherited material properties",
            "msgstr": "Propriétés d'articles héritées"
        }, {
            "msgid": "State",
            "msgstr": "Etat"
        },
        "============== REFERENCES ==============",
        {
            "msgid": "References administration",
            "msgstr": "Gestion des références"
        }, {
            "msgid": "Create a product reference",
            "msgstr": "Créer une référence produit"
        }, {
            "msgid": "Edit a product reference",
            "msgstr": "Modifier une référence produit"
        }, {
            "msgid": "Product references administration",
            "msgstr": "Gestion des références produits"
        }, {
            "msgid": "References",
            "msgstr": "Réferences"
        }, {
            "msgid": "Associated References",
            "msgstr": "Références associées"
        }, {
            "msgid": "Ref. Code",
            "msgstr": "Ref. Code"
        }, {
            "msgid": "Ref. Designation",
            "msgstr": "Ref. Désignation"
        }, {
            "msgid": "Reference code",
            "msgstr": "Code référence"
        }, {
            "msgid": "Designation",
            "msgstr": "Désignation"
        }, {
            "msgid": "designation",
            "msgstr": "désignation"
        }, {
            "msgid": "Product reference",
            "msgstr": "Référence produit"
        }, {
            "msgid": "Item sets",
            "msgstr": "Lot de matériel"
        }, {
            "msgid": "Count",
            "msgstr": "Quantité"
        }, {
            "msgid": "Identified",
            "msgstr": "Identifiée"
        }, {
            "msgid": "Uses count",
            "msgstr": "Nombre d'utilisation"
        }, {
            "msgid": "Reference inventory",
            "msgstr": "Inventaire de référence"
        }, {
            "msgid": "Assigned position for material references (for counters)",
            "msgstr": "Lieu de stockage de la référence (Pour les guichets)"
        }, {
            "msgid": "Reference designation",
            "msgstr": "Désignation de la référence"
        }, {
            "msgid": "Ref. identified",
            "msgstr": "Ref. identifiée"
        }, {
            "msgid": "Reference description",
            "msgstr": "Description de la référence"
        }, {
            "msgid": "Code RFID",
            "msgstr": "Code RFID"
        }, {
            "msgid": "RFID code",
            "msgstr": "Code RFID"
        }, {
            "msgid": "Identified item",
            "msgstr": "Article identifié"
        }, {
            "msgid": "Identified items",
            "msgstr": "Articles identifiés"
        }, {
            "msgid": "Assignation address",
            "msgstr": "Emplacements de stockage"
        }, {
            "msgid": "Last action date",
            "msgstr": "Date de dernière mise à jour"
        }, {
            "msgid": "Traceability information",
            "msgstr": "Traçabilité"
        }, {
            "msgid": "Before scanning RFID tag, place your cursor in the above code textfield",
            "msgstr": "Avant de scanner le tag RFID, placer votre curseur dans le champ texte ci-dessus"
        }, {
            "msgid": "Assigned locations",
            "msgstr": "Emplacements de stockage"
        }, {
            "msgid": "New assigned location",
            "msgstr": "Nouvel emplacement de stockage"
        }, {
            "msgid": "Warehouse",
            "msgstr": "Magasin"
        }, {
            "msgid": "Recommended location",
            "msgstr": "Emplacement de stockage"
        }, {
            "msgid": "Do you really want to delete ",
            "msgstr": "Voulez-vous vraiment supprimer "
        }, {
            "msgid": "Do you really want to dissociate property ",
            "msgstr": "Voulez-vous vraiment dissocier "
        }, {
            "msgid": "Do you really want to delete these items",
            "msgstr": "Voulez-vous vraiment supprimer ces éléments"
        }, {
            "msgid": "Count",
            "msgstr": "Quantité"
        }, {
            "msgid": "Select file",
            "msgstr": "Sélectionner un fichier"
        }, {
            "msgid": "Reference Code",
            "msgstr": "Code Référence"
        }, {
            "msgid": "This code already exists",
            "msgstr": "Ce code est déjà présent !"
        },
        "============== CATEGORIES ==============",
        {
            "msgid": "Categories administration",
            "msgstr": "Gestion des catégories"
        }, {
            "msgid": "Product categories administration",
            "msgstr": "Gestion des catégories"
        }, {
            "msgid": "Create a category",
            "msgstr": "Créer une catégorie"
        }, {
            "msgid": "Edit a category",
            "msgstr": "Modifier une catégorie"
        }, {
            "msgid": "Categories",
            "msgstr": "Catégories"
        }, {
            "msgid": "Categories selection",
            "msgstr": "Sélection d'une catégorie"
        }, {
            "msgid": "Do you really want to delete category",
            "msgstr": "Voulez-vous vraiment supprimer la categorie"
        }, {
            "msgid": "Parent category",
            "msgstr": "Catégorie mère"
        }, {
            "msgid": "Path",
            "msgstr": "Chemin"
        }, {
            "msgid": "This category is linked to any reference and sub-category.",
            "msgstr": "Cette catégorie est liée à aucune référence et à aucune sous-catégorie."
        },
        "============== INTERVENTION ORDERS ==============",
        {
            "msgid": "Create an intervention order",
            "msgstr": "Créer un ordre d'intervention"
        }, {
            "msgid": "Edit an intervention order",
            "msgstr": "Modifier un ordre d'intervention"
        }, {
            "msgid": "Intervention orders administration",
            "msgstr": "Gestion des ordres d'intervention"
        }, {
            "msgid": "Intervention orders",
            "msgstr": "Ordres d'intervention"
        }, {
            "msgid": "Intervention order",
            "msgstr": "Ordre d'intervention"
        }, {
            "msgid": "Orders",
            "msgstr": "Gestion OI"
        }, {
            "msgid": "OI Number",
            "msgstr": "Numéro OI"
        }, {
            "msgid": "Intervention order label",
            "msgstr": "Label de l'OI"
        }, {
            "msgid": "Intervention order number",
            "msgstr": "Numéro de l'OI"
        }, {
            "msgid": "Intervention order description",
            "msgstr": "Description de l'OI"
        }, {
            "msgid": "OI number already exists",
            "msgstr": "Numéro OI existe déjà"
        }, {
            "msgid": "Attention, this intervention order is related to an operation.",
            "msgstr": "Attention cet ordre d'intervention est lié à une opération."
        },
        "============== POSITIONS / LOCATIONS ==============",
        {
            "msgid": "Locations administration",
            "msgstr": "Gestion des emplacements"
        }, {
            "msgid": "Positions administration",
            "msgstr": "gestion des localisations"
        }, {
            "msgid": "Locations",
            "msgstr": "Emplacements"
        }, {
            "msgid": "Positions",
            "msgstr": "Localisations"
        }, {
            "msgid": "Create a location",
            "msgstr": "Créer un emplacement"
        }, {
            "msgid": "Edit a location",
            "msgstr": "Modifier un emplacement"
        }, {
            "msgid": "Create a position",
            "msgstr": "Créer une localisation"
        }, {
            "msgid": "Edit a position",
            "msgstr": "Modifier une localisation"
        }, {
            "msgid": "New position",
            "msgstr": "Localisation"
        }, {
            "msgid": "New location",
            "msgstr": "Emplacement"
        }, {
            "msgid": "Delete a position",
            "msgstr": "Supprimer une localisation"
        }, {
            "msgid": "Position",
            "msgstr": "Localisation"
        }, {
            "msgid": "Parent position",
            "msgstr": "Localisation parente"
        }, {
            "msgid": "Location",
            "msgstr": "Emplacement"
        }, {
            "msgid": "Allowed users",
            "msgstr": "Utilisateurs autorisés"
        }, {
            "msgid": "Locations selection",
            "msgstr": "Selection d'emplacements"
        }, {
            "msgid": "Location selection",
            "msgstr": "Selection d'un emplacement"
        },
        "============== USERS / PROFILES ==============",
        {
            "msgid": "User",
            "msgstr": "Utilisateur"
        }, {
            "msgid": "Users administration",
            "msgstr": "Gestion des utilisateurs"
        }, {
            "msgid": "Users profiles allocation",
            "msgstr": "Affectation des profils aux utilisateurs"
        },{
            "msgid": "Devices access allocation",
            "msgstr": "Affectation des accès aux périphériques"
        }, {
            "msgid": "Privileges are not high enough to edit this user",
            "msgstr": "Les privilèges ne sont pas assez élevés pour pouvoir éditer cet utilisateur"
        }, {
            "msgid": "logistic operation",
            "msgstr": "Operation logistique"
        }, {
            "msgid": "Criteria 1",
            "msgstr": "Critere 1"
        }, {
            "msgid": "Value criteria 1",
            "msgstr": "Valeur critere 1"
        }, {
            "msgid": "Criteria 2",
            "msgstr": "Critere 2"
        }, {
            "msgid": "Value criteria 2",
            "msgstr": "Valeur critere 2"
        }, {
            "msgid": "Properties",
            "msgstr": "Propriétés"
        },{
            "msgid": "Select devices to Add",
            "msgstr": "Sélectionner les périphériques à ajouter"
        },  {
            "msgid": "Select devices to delete",
            "msgstr": "Sélectionner les périphériques à supprimer"
        }, {
            "msgid": "Select a reference property to delete",
            "msgstr": "Sélectionnez une propriété de référence à supprimer"
        },{
            "msgid": "Select an item property to delete",
            "msgstr": "Sélectionnez une propriété de matériel à supprimer"
        },{
            "msgid": "Select a property to delete",
            "msgstr": "Sélectionnez une propriété à supprimer"
        },{
            "msgid": "Select a reference property to add",
            "msgstr": "Sélectionnez une propriété de référence à ajouter"
        }, {
            "msgid": "Select an item property to add",
            "msgstr": "Sélectionnez une propriété de matériel à ajouter"
        }, {
            "msgid": "Select a property to add",
            "msgstr": "Sélectionnez une propriété à ajouter"
        }, {
            "msgid": "Select users to add",
            "msgstr": "Sélectionner les utilisateurs à ajouter"
        }, {
            "msgid": "Select users to delete",
            "msgstr": "Sélectionner les utilisateurs à supprimer"
        },  {
            "msgid": "Select an item to add",
            "msgstr": "Sélectionnez un matériel à ajouter"
        }, {
            "msgid": "Select an item to delete",
            "msgstr": "Sélectionnez un matériel à supprimer"
        }, {
            "msgid": "Users",
            "msgstr": "Utilisateurs"
        }, {
            "msgid": "Create a user",
            "msgstr": "Créer un utilisateur"
        }, {
            "msgid": "Edit an user",
            "msgstr": "Modifier un utilisateur"
        }, {
            "msgid": "Delete an user",
            "msgstr": "Supprimer un utilisateur"
        }, {
            "msgid": "Users selection",
            "msgstr": "Sélection d'utilisateurs"
        }, {
            "msgid": "Select users to add",
            "msgstr": "Sélectionnez les utilisateurs à ajouter"
        }, {
            "msgid": "Profiles administration",
            "msgstr": "Gestion des profils"
        }, {
            "msgid": "Contact",
            "msgstr": "Contact"
        }, {
            "msgid": "Profiles",
            "msgstr": "Profils"
        }, {
            "msgid": "Allowed locations",
            "msgstr": "Emplacements autorisés"
        }, {
            "msgid": "Requirements",
            "msgstr": "Modes d'utilisation"
        }, {
            "msgid": "Identifier",
            "msgstr": "Identifiant"
        }, {
            "msgid": "First name",
            "msgstr": "Prénom"
        }, {
            "msgid": "Last name",
            "msgstr": "Nom"
        }, {
            "msgid": "E-Mail",
            "msgstr": "E-Mail"
        }, {
            "msgid": "Sign in",
            "msgstr": "Connexion"
        }, {
            "msgid": "Login",
            "msgstr": "Login"
        }, {
            "msgid": "Password",
            "msgstr": "Mot de passe"
        }, {
            "msgid": "Access card",
            "msgstr": "Carte d'accès"
        }, {
            "msgid": "Alert owner",
            "msgstr": "Responsable alerte"
        }, {
            "msgid": "Recipient",
            "msgstr": "Destinataires"
        }, {
            "msgid": "Badge number",
            "msgstr": "Numéro de badge"
        }, {
            "msgid": "Profiles selection",
            "msgstr": "Sélection des profils"
        }, {
            "msgid": "Requirements selection",
            "msgstr": "Sélection des modes d'utilisation"
        }, {
            "msgid": "Authorized Locations",
            "msgstr": "Emplacements autorisés"
        }, {
            "msgid": "User identifier",
            "msgstr": "Identifiant de l'utilisateur"
        }, {
            "msgid": "User (identifier)",
            "msgstr": "Utilisateur (identifiant)"
        }, {
            "msgid": "Email",
            "msgstr": "Email"
        }, {
            "msgid": "Activated",
            "msgstr": "Activé"
        }, {
            "msgid": "New password",
            "msgstr": "Nouveau mot de passe"
        }, {
            "msgid": "Activated account",
            "msgstr": "Compte activé"
        }, {
            "msgid": "Create a profile",
            "msgstr": "Créer un profil"
        }, {
            "msgid": "Edit a profile",
            "msgstr": "Modifier un profil"
        }, {
            "msgid": "References selection",
            "msgstr": "Sélection d'une référence"
        }, {
            "msgid": "Authorized",
            "msgstr": "Autorisé"
        }, {
            "msgid": "Authorize",
            "msgstr": "Autoriser"
        }, {
            "msgid": "Features",
            "msgstr": "Fonctionnalités"
        }, {
            "msgid": "Profile",
            "msgstr": "Profil"
        }, {
            "msgid": "Rights selection",
            "msgstr": "Sélection des droits"
        }, {
            "msgid": "Profiles list",
            "msgstr": "Liste des profils"
        }, {
            "msgid": "Choose a new password",
            "msgstr": "Choisissez un nouveau mot de passe"
        }, {
            "msgid": "Previous password",
            "msgstr": "Précédent"
        }, {
            "msgid": "Authorized locations",
            "msgstr": "Emplacements autorisés"
        }, {
            "msgid": "Identity",
            "msgstr": "Identité"
        }, {
            "msgid": "Firstname",
            "msgstr": "Prénom"
        }, {
            "msgid": "Lastname",
            "msgstr": "Nom"
        }, {
            "msgid": "Profile ",
            "msgstr": "Profil "
        }, {
            "msgid": "Log out",
            "msgstr": "Déconnexion"
        }, {
            "msgid": "Login error",
            "msgstr": "Erreur de connexion"
        }, {
            "msgid": "Select at least one profile",
            "msgstr": "Sélectionnez au moins un profil"
        }, {
            "msgid": "Edit users",
            "msgstr": "Modifier des utilisateurs"
        }, {
            "msgid": "Technical",
            "msgstr": "Technique"
        }, {
            "msgid": "Technical user",
            "msgstr": "Utilisateur technique"
        }, {
            "msgid": "Requirement",
            "msgstr": "Besoin opérationnel"
        }, {
            "msgid": "Super administration",
            "msgstr": "Super administrattion"
        }, {
            "msgid": "User firstname",
            "msgstr": "Prénom de l'utilisateur"
        }, {
            "msgid": "User lastname",
            "msgstr": "Nom de l'utilisateur"
        }, {
            "msgid": "Pin code",
            "msgstr": "Code Pin"
        }, {
            "msgid": "Please, select a profile.",
            "msgstr": "Merci de sélectionner un profil."
        }, {
            "msgid": "Invalid login",
            "msgstr": "Ce login n'est pas valide."
        }, {
            "msgid": "First name / Last name",
            "msgstr": "Prénom / nom"
        }, {
            "msgid": "Do you really want to delete these users",
            "msgstr": "Voullez-vous vraiment supprimer ces utilisateurs"
        }, {
            "msgid": "Configuration in progress, please wait...",
            "msgstr": "Configuration en cours, merci de patienter..."
        },
        "============== RIGHTS ==============",
        {
            "msgid": "Dashboard consultation",
            "msgstr": "Consultation des tableaux de bords"
        }, {
            "msgid": "Dashboard configuration",
            "msgstr": "Configuration des tableaux de bords"
        }, {
            "msgid": "Dynamic properties administration",
            "msgstr": "Gestion des propriétés dynamiques"
        }, {
            "msgid": "Specific checks configuration",
            "msgstr": "Configuration des contôles spécifiques"
        }, {
            "msgid": "Web client configuration",
            "msgstr": "Configuration du client web commune"
        }, {
            "msgid": "Operations alerts",
            "msgstr": "Alertes sur les opérations"
        }, {
            "msgid": "Planned operations",
            "msgstr": "Opérations planifiées"
        }, {
            "msgid": "References inventory",
            "msgstr": "Inventaire des références"
        }, {
            "msgid": "Assigned position for material references",
            "msgstr": "Emplacements de stockage pour les références"
        }, {
            "msgid": "Synchronisation with devices",
            "msgstr": "Synchronisation des périphériques"
        }, {
            "msgid": "Home page",
            "msgstr": "Page d'accueil"
        }, {
            "msgid": "Send/Receive",
            "msgstr": "Envoi/Réception"
        }, {
            "msgid": "Borrow/Return",
            "msgstr": "Emprun/Retour"
        }, {
            "msgid": "Consume/Provision",
            "msgstr": "Consommation/Approvisionnement"
        }, {
            "msgid": "Associate/Dissociate tag",
            "msgstr": "Association/Dissociation de tags"
        }, {
            "msgid": "Specific checks management",
            "msgstr": "Gestion des contrôles spécifiques"
        }, {
            "msgid": "Stock levels management",
            "msgstr": "Gestion des niveaux de stock"
        }, {
            "msgid": "Planned operations management",
            "msgstr": "Gestion de la planification d'opérations"
        }, {
            "msgid": "Departure/return for maintenance",
            "msgstr": "Départ/Retour en maintenance"
        }, {
            "msgid": "Departure/return for calibration",
            "msgstr": "Départ/Retour en étalonnage"
        }, {
            "msgid": "Return from calibration",
            "msgstr": "Retour d'étalonnage"
        }, {
            "msgid": "Leave for calibration",
            "msgstr": "Départ en étalonnage"
        }, {
            "msgid": "Return from maintenance",
            "msgstr": "Retour de maintenance"
        }, {
            "msgid": "Leave for maintenance",
            "msgstr": "Départ en maintenance"
        }, {
            "msgid": "Alerts management",
            "msgstr": "Gestion des alertes"
        }, {
            "msgid": "Associate / dissociate tag",
            "msgstr": "Association/Dissociation de tags"
        }, {
            "msgid": "Acknowledge alerts",
            "msgstr": "Acquitter une alerte"
        }, {
            "msgid": "Specific checks configuration",
            "msgstr": "Configuration des contrôles spécifiques"
        }, {
            "msgid": "Web client configuration",
            "msgstr": "Configuration du client web"
        }, {
            "msgid": "Loggins of sendings",
            "msgstr": "Historique des envois"
        }, {
            "msgid": "Synchronization with devices",
            "msgstr": "Synchronisation des périphériques"
        }, {
            "msgid": "Logging of alerts",
            "msgstr": "Historique des alertes"
        }, {
            "msgid": "Items and operations alerts",
            "msgstr": "Alertes sur articles et opérations"
        }, {
            "msgid": "WEB CLIENT",
            "msgstr": "CLIENT WEB"
        }, {
            "msgid": "ALERTS",
            "msgstr": "ALERTES"
        }, {
            "msgid": "BUSINESS",
            "msgstr": "METIER"
        }, {
            "msgid": "CONSULTATION",
            "msgstr": "CONSULTATION"
        }, {
            "msgid": "HISTORIC",
            "msgstr": "HISTORIQUES"
        }, {
            "msgid": "MANAGEMENT",
            "msgstr": "GESTION"
        }, {
            "msgid": "SYSTEM",
            "msgstr": "SYSTEME"
        }, {
            "msgid": "SETTINGS",
            "msgstr": "PARAMETRES"
        }, {
            "msgid": "DASHBOARD",
            "msgstr": "TABLEAUX DE BORDS"
        }, {
            "msgid": "Reader configuration",
            "msgstr": "Configuration des lecteurs"
        },
        "============== DEVICES / PACKAGES ==============",
        {
            "msgid": "Devices maintenance",
            "msgstr": "Administration des périphériques"
        }, {
            "msgid": "Device updates",
            "msgstr": "Mise à jour des périphériques"
        }, {
            "msgid": "Devices administration",
            "msgstr": "Gestion des périphériques"
        }, {
            "msgid": "Select targeted devices",
            "msgstr": "Périphériques ciblés"
        }, {
            "msgid": "Add a package",
            "msgstr": "Ajouter une mise à jour"
        }, {
            "msgid": "Packages maintenance",
            "msgstr": "Maintenance des mises à jour"
        }, {
            "msgid": "Packages administration",
            "msgstr": "Gestion des mises à jour"
        }, {
            "msgid": "Devices",
            "msgstr": "Périphériques"
        }, {
            "msgid": "Authorize",
            "msgstr": "Authorise"
        }, {
            "msgid": "IP Address",
            "msgstr": "Adresse IP"
        }, {
            "msgid": "Version",
            "msgstr": "Version"
        }, {
            "msgid": "Package name",
            "msgstr": "Nom du package de Maj."
        }, {
            "msgid": "Update Version",
            "msgstr": "Version de la Maj"
        }, {
            "msgid": "Servers Compatibility",
            "msgstr": "Compatibilité serveur"
        }, {
            "msgid": "Update packages administration",
            "msgstr": "Gestion des packages de mises à jour"
        }, {
            "msgid": "Signature",
            "msgstr": "Signature"
        }, {
            "msgid": "Enabled",
            "msgstr": "Activé"
        }, {
            "msgid": "Software version",
            "msgstr": "Version logicielle"
        }, {
            "msgid": "Last connection",
            "msgstr": "Dernière connexion"
        }, {
            "msgid": "Warning",
            "msgstr": "Attention"
        }, {
            "msgid": "This device is already authorized!",
            "msgstr": "Ce périphérique est déjà autorisé !"
        }, {
            "msgid": "Package",
            "msgstr": "Package"
        }, {
            "msgid": "Select a package update in .zip format",
            "msgstr": "Sélectionner un package de mise à jour au format .zip"
        }, {
            "msgid": "Devices inventory",
            "msgstr": "Liste des périphériques"
        }, {
            "msgid": "The package is not compatible with these devices",
            "msgstr": "Le package n'est pas compatible avec ces périphériques"
        }, {
            "msgid": "Counter",
            "msgstr": "Guichet"
        }, {
            "msgid": "Edit a device",
            "msgstr": "Modifier un périphérique"
        }, {
            "msgid": "Warnings",
            "msgstr": "Alertes"
        }, {
            "msgid": "Logs",
            "msgstr": "Logs"
        }, {
            "msgid": "Acces",
            "msgstr": "Accès"
        }, {
            "msgid": "FOD",
            "msgstr": "FOD"
        }, {
            "msgid": "Planned software version",
            "msgstr": "Version logicielle prévue"
        }, {
            "msgid": "Logs files required",
            "msgstr": "Fichiers de Logs demandés"
        }, {
            "msgid": "Last connection date",
            "msgstr": "Date de dernière connexion"
        }, {
            "msgid": "Share",
            "msgstr": "Partager"
        }, {
            "msgid": "Edit a configuration property",
            "msgstr": "Editer une propriété de configuration"
        }, {
            "msgid": "Device value",
            "msgstr": "Valeur du périphérique"
        }, {
            "msgid": "New value",
            "msgstr": "Nouvelle valeur"
        }, {
            "msgid": "Manage",
            "msgstr": "Configurer"
        }, {
            "msgid": "Require logs",
            "msgstr": "Demande de logs"
        }, {
            "msgid": "The request was sent to the device.",
            "msgstr": "La demande de fichiers de logs a été envoyée au périphérique."
        }, {
            "msgid": "Configuration failed!",
            "msgstr": "La configuration a échoué!"
        }, {
            "msgid": "Message",
            "msgstr": "Message"
        }, {
            "msgid": "Configuration property was sent to devices.",
            "msgstr": "La configuration a été transmise aux périphériques."
        }, {
            "msgid": "Ban",
            "msgstr": "Exclure"
        }, {
            "msgid": "Do you really want to ban ",
            "msgstr": "Voulez-vous vraiment exclure "
        }, {
            "msgid": "Ban a device",
            "msgstr": "Exclure un périphérique"
        }, {
            "msgid": "All log files in zip archive",
            "msgstr": "Tous les fichiers de logs (archive zip)"
        }, {
            "msgid": "Last log file",
            "msgstr": "Fichier de logs le plus récent"
        }, {
            "msgid": "Server logs",
            "msgstr": "Logs serveur"
        }, {
            "msgid": "Login date",
            "msgstr": "Date de connexion"
        }, {
            "msgid": "Logout date",
            "msgstr": "Date de déconnexion"
        }, {
            "msgid": "Device name",
            "msgstr": "Périphérique"
        }, {
            "msgid": "Device type",
            "msgstr": "Type"
        }, {
            "msgid": "Tag reader name",
            "msgstr": "Lecteur de badge"
        }, {
            "msgid": "Load",
            "msgstr": "Télécharger"
        }, {
            "msgid": "Load last",
            "msgstr": "Télécharger le plus récent"
        }, {
            "msgid": "Load all (zip file)",
            "msgstr": "Télécharger tout (fichier zip)"
        }, {
            "msgid": "Be careful, this action can take a while!",
            "msgstr": "Attention, cette action peut demander un certain temps !"
        }, {
            "msgid": "Access",
            "msgstr": "Accès"
        }, {
            "msgid": "Devices consultation",
            "msgstr": "Consultation des périphériques"
        }, {
            "msgid": "Devices configuration",
            "msgstr": "Configuration des périphériques"
        }, {
            "msgid": "Devices maintenance configuration",
            "msgstr": "Configuration et maintenance des périphériques"
        }, {
            "msgid": "Technical properties",
            "msgstr": "Caractéristiques techniques"
        }, {
            "msgid": "Place",
            "msgstr": "Emplacement"
        }, {
            "msgid": "Position address",
            "msgstr": "Localisation"
        }, {
            "msgid": "New location name",
            "msgstr": "Nouvel emplacement"
        },
        "============== ALERTS ==============",
        {
            "msgid": "Alerts acknowledgement",
            "msgstr": "Acquittement des alertes"
        }, {
            "msgid": "Alerts",
            "msgstr": "Alertes"
        }, {
            "msgid": "Items alerts",
            "msgstr": "Articles"
        }, {
            "msgid": "Current operations alerts",
            "msgstr": "Alertes sur opérations"
        }, {
            "msgid": "Anomalies",
            "msgstr": "Alertes"
        }, {
            "msgid": "Acknowledged",
            "msgstr": "Acquitée"
        }, {
            "msgid": "Acknowledge",
            "msgstr": "Acquitter"
        }, {
            "msgid": "Acknowledgment",
            "msgstr": "Acquittement"
        }, {
            "msgid": "Acknowlegement / resolution",
            "msgstr": "Acquittement"
        }, {
            "msgid": "Trigger Time",
            "msgstr": "Journalière"
        }, {
            "msgid": "Day and Trigger Time",
            "msgstr": "Hebdomadaire"
        }, {
            "msgid": "Month and Trigger Time",
            "msgstr": "Mensuelle"
        }, {
            "msgid": "Raising for a new alert",
            "msgstr": "Déclenchement sur alerte"
        }, {
            "msgid": "Create an alert",
            "msgstr": "Créer une alerte"
        }, {
            "msgid": "Edit an alert",
            "msgstr": "Modifier une alerte"
        }, {
            "msgid": "Alert level",
            "msgstr": "Niveau d'alerte"
        }, {
            "msgid": "Create a notif mail",
            "msgstr": "Créer une notification par e-mail"
        }, {
            "msgid": "Edit a notif mail",
            "msgstr": "Modifier une notification par e-mail"
        }, {
            "msgid": "Notif mail configuration",
            "msgstr": "Configuration des notifications par e-mail"
        }, {
            "msgid": "Type of control",
            "msgstr": "Type de vérification"
        }, {
            "msgid": "description",
            "msgstr": "description"
        }, {
            "msgid": "Parameters",
            "msgstr": "Paramètres"
        }, {
            "msgid": "Trigger selection",
            "msgstr": "Sélection du déclencheur"
        }, {
            "msgid": "undefined",
            "msgstr": "Non défini"
        }, {
            "msgid": "Do you really want to",
            "msgstr": "Voulez-vous vraiment"
        }, {
            "msgid": "activate",
            "msgstr": "activer"
        }, {
            "msgid": "deactivate",
            "msgstr": "désactiver"
        }, {
            "msgid": "Alert on control",
            "msgstr": "Alerte sur ce contrôle levée"
        }, {
            "msgid": "Basic alerts configuration",
            "msgstr": "Configuration basique des alertes"
        }, {
            "msgid": "Object",
            "msgstr": "Objet"
        }, {
            "msgid": "Alert name",
            "msgstr": "Nom de l'alerte"
        }, {
            "msgid": "Is acknowledged",
            "msgstr": "Est Acquitée"
        }, {
            "msgid": "Acknowledgment Date",
            "msgstr": "Date d'acquitement"
        }, {
            "msgid": "Reason",
            "msgstr": "Raison"
        }, {
            "msgid": "Acknowledger id",
            "msgstr": "Id de l'acquitement"
        }, {
            "msgid": "Inventories alerts",
            "msgstr": "Inventaires"
        }, {
            "msgid": "Stocks alerts",
            "msgstr": "Stocks"
        }, {
            "msgid": "Users alerts",
            "msgstr": "Utilisateurs"
        }, {
            "msgid": "Locations alerts",
            "msgstr": "Emplacements"
        }, {
            "msgid": "Devices alerts",
            "msgstr": "Périphériques"
        },{
            "msgid": "Items alerts",
            "msgstr": "Alertes sur les articles",
            "msgctx": "title"
        }, {
            "msgid": "Inventories alerts",
            "msgstr": "Alertes sur les inventaires",
            "msgctx": "title"
        }, {
            "msgid": "Stocks alerts",
            "msgstr": "Alertes sur les stocks",
            "msgctx": "title"
        }, {
            "msgid": "Users alerts",
            "msgstr": "Alertes sur les utilisateurs",
            "msgctx": "title"
        }, {
            "msgid": "Locations alerts",
            "msgstr": "Alertes sur les emplacements",
            "msgctx": "title"
        }, {
            "msgid": "Devices alerts",
            "msgstr": "Alertes sur les périphériques",
            "msgctx": "title"
        }, {
            "msgid": "Trigger",
            "msgstr": "Déclencheur"
        }, {
            "msgid": "Type of configuration",
            "msgstr": "Type de configuration"
        }, {
            "msgid": "Alert configuration",
            "msgstr": "Configuration des alertes"
        }, {
            "msgid": "Triggers",
            "msgstr": "Déclencheurs"
        },
        "============== LOGINGS ==============",
        {
            "msgid": "Loggings",
            "msgstr": "Historiques"
        }, {
            "msgid": "Logging of consumptions",
            "msgstr": "Historique des consommations"
        }, {
            "msgid": "Loggins of calibrations",
            "msgstr": "Historique des étalonnages"
        }, {
            "msgid": "Movements",
            "msgstr": "Déplacements"
        }, {
            "msgid": "Logging of receives",
            "msgstr": "Historique des réceptions"
        }, {
            "msgid": "Logging of inventories",
            "msgstr": "Historiques des inventaires"
        }, {
            "msgid": "Logging of borrows",
            "msgstr": "Historique des emprunts"
        }, {
            "msgid": "Logging of calibrations",
            "msgstr": "Historique des étalonnages"
        }, {
            "msgid": "Logging of movings",
            "msgstr": "Historique des déplacements"
        }, {
            "msgid": "Logging of maintenances",
            "msgstr": "Historique des maintenances"
        }, {
            "msgid": "Logging of specific checks",
            "msgstr": "Historique des controles spécifiques"
        }, {
            "msgid": "Logging of returns",
            "msgstr": "Historique des retours"
        }, {
            "msgid": "Provisions historic",
            "msgstr": "Historique des approvisionnements"
        }, {
            "msgid": "Loggin of alerts",
            "msgstr": "Historique des alertes"
        }, {
            "msgid": "Historics",
            "msgstr": "Historiques"
        }, {
            "msgid": "Quantity",
            "msgstr": "Quantité"
        }, {
            "msgid": "Source",
            "msgstr": "Origine"
        }, {
            "msgid": "Destination",
            "msgstr": "Destination"
        }, {
            "msgid": "IO Number",
            "msgstr": "Numéro d'OI"
        }, {
            "msgid": "Sending Number",
            "msgstr": "Numéro d'envoi"
        }, {
            "msgid": "Select All",
            "msgstr": "Tout sélectionner"
        }, {
            "msgid": "Deselect All",
            "msgstr": "Tout désélectionner"
        }, {
            "msgid": "Loggins of sendings",
            "msgstr": "Historique des envois"
        }, {
            "msgid": "Creation date",
            "msgstr": "Date de création"
        }, {
            "msgid": "Resolution date",
            "msgstr": "Date de résolution"
        }, {
            "msgid": "Acknowledgment date",
            "msgstr": "Date d'acquittement"
        }, {
            "msgid": "Loggin of access",
            "msgstr": "Historique des accès"
        },
        "============== CALIBRATIONS ==============",
        {
            "msgid": "Calibrations",
            "msgstr": "Etalonnages"
        },
        "============== PLANIFICATIONS ==============",
        {
            "msgid": "Planifications",
            "msgstr": "Planifications"
        }, {
            "msgid": "Assignations",
            "msgstr": "Assignations"
        },
        "============== OPERATION INVENTORY ==============",
        {
            "msgid": "Expected items",
            "msgstr": "Articles attendus"
        },{
            "msgid": "Expected material sets",
            "msgstr": "Lots de matériels attendus"
        },{
            "msgid": "Expected lot references",
            "msgstr": "Références de lot attendues"
        }, {
            "msgid": "Present items",
            "msgstr": "Articles présents"
        }, {
            "msgid": "Missing items",
            "msgstr": "Articles manquants"
        }, {
            "msgid": "Foreign items",
            "msgstr": "Articles étrangers"
        }, {
            "msgid": "Execution date",
            "msgstr": "Date d'éxécution"
        }, {
            "msgid": "Inventory type",
            "msgstr": "Type d'inventaire"
        }, {
            "msgid": "Criteria",
            "msgstr": "Critère"
        }, {
            "msgid": "Scanned items",
            "msgstr": "Articles scannés"
        }, {
            "msgid": "Unknown items",
            "msgstr": "Articles inconnus"
        }, {
            "msgid": "Comments",
            "msgstr": "Remarques"
        }, {
            "msgid": "Present",
            "msgstr": "Présent"
        }, {
            "msgid": "Intruder",
            "msgstr": "Intrus"
        }, {
            "msgid": "Muddled",
            "msgstr": "Mal rangé"
        }, {
            "msgid": "Presence",
            "msgstr": "Présence"
        }, {
            "msgid": "Absent",
            "msgstr": "Absent"
        },
        "============== INVENTORIES ==============",
        {
            "msgid": "Items inventory",
            "msgstr": "Inventaire des articles" //Inventaire des articles et lots de matériel
        }, {
            "msgid": "Inventory by location",
            "msgstr": "Inventaire par emplacement"
        }, {
            "msgid": "Calibrations inventory",
            "msgstr": "Etalonnages en cours"
        }, {
            "msgid": "Maintenance inventory",
            "msgstr": "Maintenances en cours"
        }, {
            "msgid": "Current borrowings",
            "msgstr": "Emprunts en cours"
        }, {
            "msgid": "Current calibrations",
            "msgstr": "Etalonnages en cours"
        }, {
            "msgid": "Current maintenances",
            "msgstr": "Maintenances en cours"
        }, {
            "msgid": "Current sendings",
            "msgstr": "Envois en cours"
        }, {
            "msgid": "Materials sets inventory",
            "msgstr": "Lots de matériels"
        }, {
            "msgid": "Materials Sets",
            "msgstr": "Lots de matériels"
        }, {
            "msgid": "Materials sets",
            "msgstr": "Lots de matériels"
        }, {
            "msgid": "Materials set",
            "msgstr": "Lot de matériels"
        }, {
            "msgid": "(Materials set)",
            "msgstr": "(Lot de matériels)"
        },
        "============== OPERATIONS ==============",
        {
            "msgid": "Maintain",
            "msgstr": "Maintenance"
        }, {
            "msgid": "Send",
            "msgstr": "Envoi"
        }, {
            "msgid": "Consumptions",
            "msgstr": "Consommation"
        }, {
            "msgid": "Borrowings",
            "msgstr": "Emprunts"
        }, {
            "msgid": "Borrow",
            "msgstr": "Emprunt"
        }, {
            "msgid": "Sendings",
            "msgstr": "Envois"
        }, {
            "msgid": "Associate tag",
            "msgstr": "Association de tag"
        }, {
            "msgid": "Identify",
            "msgstr": "Identification"
        }, {
            "msgid": "Inventory",
            "msgstr": "Inventaire"
        }, {
            "msgid": "Execute",
            "msgstr": "Exécution"
        }, {
            "msgid": "Locate",
            "msgstr": "Localisation"
        }, {
            "msgid": "Maintenances",
            "msgstr": "Maintenances"
        }, {
            "msgid": "Dissociate tag",
            "msgstr": "Dissociation de tag"
        }, {
            "msgid": "Receiving",
            "msgstr": "Réception"
        }, {
            "msgid": "Inventoried items management",
            "msgstr": "Gestion des articles inventoriés"
        }, {
            "msgid": "Operations inventory",
            "msgstr": "Opérations d'inventaire"
        }, {
            "msgid": "Inventories",
            "msgstr": "Inventaires"
        }, {
            "msgid": "Operations",
            "msgstr": "Opérations"
        }, {
            "msgid": "Provisions",
            "msgstr": "Approvisionnement"
        }, {
            "msgid": "Operation",
            "msgstr": "Opération"
        }, {
            "msgid": "Receiving",
            "msgstr": "Réception"
        }, {
            "msgid": "Inventoried items",
            "msgstr": "Articles inventoriés"
        }, {
            "msgid": "Material name",
            "msgstr": "Nom d'article"
        }, {
            "msgid": "Destination Address",
            "msgstr": "Adresse de destination"
        }, {
            "msgid": "Expedition number",
            "msgstr": "Numéro d'expédition"
        }, {
            "msgid": "Operation date",
            "msgstr": "Date d'opération"
        }, {
            "msgid": "Item name",
            "msgstr": "Nom d'article"
        }, {
            "msgid": "IO number",
            "msgstr": "Numéro d'OI"
        }, {
            "msgid": "Sending number",
            "msgstr": "Numéro d'envoi"
        }, {
            "msgid": "Recipient",
            "msgstr": "Destinataire"
        }, {
            "msgid": "Return",
            "msgstr": "Retour"
        }, {
            "msgid": "Receive",
            "msgstr": "Réception"
        }, {
            "msgid": "Move",
            "msgstr": "Déplacement"
        }, {
            "msgid": "Consume",
            "msgstr": "Consommation"
        }, {
            "msgid": "Provision",
            "msgstr": "Approvisionnement"
        }, {
            "msgid": "To maintenance",
            "msgstr": "Départ en maintenance"
        }, {
            "msgid": "From maintenance",
            "msgstr": "Retour de maintenance"
        }, {
            "msgid": "To calibration",
            "msgstr": "Départ en étalonnage"
        }, {
            "msgid": "From calibration",
            "msgstr": "Retour d'étalonnage"
        }, {
            "msgid": "Operation type",
            "msgstr": "Type d'opération"
        }, {
            "msgid": "Receive an article",
            "msgstr": "Réceptionner un article"
        }, {
            "msgid": "Receivings",
            "msgstr": "Réceptions"
        }, {
            "msgid": "Destination path",
            "msgstr": "Adresse de destination"
        },
        "============== EXPIRATIONS DATES ==============",
        {
            "msgid": "Expiration dates",
            "msgstr": "Date limite d'utilisation"
        },
        "============== SEARCH ==============",
        {
            "msgid": "Search",
            "msgstr": "Recherche"
        },
        "============== SPECIFIC CHECKS ==============",
        {
            "msgid": "Specific check",
            "msgstr": "Contrôle spécifique"
        }, {
            "msgid": "Controls validation",
            "msgstr": "Validation des contrôles"
        }, {
            "msgid": "Specific checks",
            "msgstr": "Contrôles spécifiques"
        }, {
            "msgid": "Controls",
            "msgstr": "Contrôles"
        }, {
            "msgid": "Date of control",
            "msgstr": "Date du contrôle"
        }, {
            "msgid": "Checks",
            "msgstr": "Contrôles"
        }, {
            "msgid": "Compliance",
            "msgstr": "Conformité"
        }, {
            "msgid": "Compliant",
            "msgstr": "Conforme"
        }, {
            "msgid": "Non-compliant",
            "msgstr": "Non conforme"
        }, {
            "msgid": "Control type",
            "msgstr": "Type de contrôle"
        }, {
            "msgid": "Control name",
            "msgstr": "Nom du contrôle"
        }, {
            "msgid": "Reference",
            "msgstr": "Référence"
        }, {
            "msgid": "Create a specific check",
            "msgstr": "Créer un contrôle spécifique"
        }, {
            "msgid": "Edit a specific check",
            "msgstr": "Modifier un contrôle spécifique"
        }, {
            "msgid": "Nb paragraph",
            "msgstr": "Nb de paragraphes"
        }, {
            "msgid": "Specific check configuration",
            "msgstr": "Configuration du contrôle spécifique"
        }, {
            "msgid": "Create a  control",
            "msgstr": "Créer un contrôle"
        }, {
            "msgid": "Edit a  control",
            "msgstr": "Modifier un contrôle"
        }, {
            "msgid": "Create a  paragraph",
            "msgstr": "Créer un paragraphe"
        }, {
            "msgid": "Edit paragraph",
            "msgstr": "Modifier un paragraphe"
        }, {
            "msgid": "Edit title",
            "msgstr": "Modifier un titre"
        }, {
            "msgid": "Photo",
            "msgstr": "Photo"
        }, {
            "msgid": "Scan",
            "msgstr": "Scan"
        }, {
            "msgid": "Conformity",
            "msgstr": "Conformité"
        }, {
            "msgid": "Report",
            "msgstr": "Rapport"
        }, {
            "msgid": "Specific check paragraph",
            "msgstr": "Paragraphe de contrôle spécifique"
        }, {
            "msgid": "Has references",
            "msgstr": "Possède une référence"
        }, {
            "msgid": "Max",
            "msgstr": "Max"
        }, {
            "msgid": "Specific check control",
            "msgstr": "Champ de contrôle spécifique"
        }, {
            "msgid": "Property name",
            "msgstr": "Nom de propriété"
        }, {
            "msgid": "Options",
            "msgstr": "Options"
        }, {
            "msgid": "Comment",
            "msgstr": "Commentaire"
        }, {
            "msgid": "Paragraph",
            "msgstr": "Paragraphe"
        }, {
            "msgid": "Attention, this modification requires total synchronizations on all the tablets. First, make sure that all the controls done on the tablets were synchronized.",
            "msgstr": "Attention cette modification implique des synchronisations totales sur toutes les tablettes, vérifier d\'abord que tous les contrôles effectués sur tablettes ont été synchronisés."
        }, {
            "msgid": "Do you really want to delete paragraph ",
            "msgstr": "Voulez-vous vraiment supprimer le paragraphe "
        },
        "============== PLAN ==============",
        {
            "msgid": "Plan",
            "msgstr": "Plannifier"
        },
        "============== DEADLINE ==============",
        {
            "msgid": "Deadlines",
            "msgstr": "Echéances"
        },
        "============== STOCK LEVEL ==============",
        {
            "msgid": "Stock levels",
            "msgstr": "Niveaux de stock"
        }, {
            "msgid": "Edit a stock level monitoring",
            "msgstr": "Modifier un suivi de niveau de stock"
        }, {
            "msgid": "Create a stock level monitoring",
            "msgstr": "Créer un suivi de niveau de stock"
        }, {
            "msgid": "Lower threshold",
            "msgstr": "Seuil bas"
        }, {
            "msgid": "Higher threshold",
            "msgstr": "Seuil haut"
        }, 
        {
            "msgid": "Safe threshold",
            "msgstr": "Seuil de sécurité"
        },
        
        {
            "msgid": "Monitoring of stock levels",
            "msgstr": "Suivi des niveaux de stock"
        }, {
            "msgid": "Stock administration",
            "msgstr": "Gestion des stocks"
        }, {
            "msgid": "No Compliant",
            "msgstr": "Non conforme"
        }, {
            "msgid": "At least one threshold must be filled",
            "msgstr": "Au moins un seuil doit être renseigné"
        }, {
            "msgid": "A stock level is applied to this location",
            "msgstr": "Un niveau de stock est appliqué à cet emplacement"
        }, {
            "msgid": "Product reference used by stock level",
            "msgstr": "Un niveau de stock est appliqué à cette référence"
        },
        "============== TYPES / ENUMS ==============",
        {
            "msgid": "Integer",
            "msgstr": "Nombre entier"
        }, {
            "msgid": "Number",
            "msgstr": "Nombre à virgule"
        }, {
            "msgid": "Date",
            "msgstr": "Date"
        }, {
            "msgid": "Time",
            "msgstr": "Heure"
        }, {
            "msgid": "Date & Time",
            "msgstr": "Date & Heure"
        }, {
            "msgid": "Check box",
            "msgstr": "Case à cocher"
        }, {
            "msgid": "Combo box",
            "msgstr": "Menu déroulant"
        }, {
            "msgid": "Text field",
            "msgstr": "Champ de texte"
        }, {
            "msgid": "Simple Text field",
            "msgstr": "Champ de texte simple"
        }, {
            "msgid": "Multi lines Text box",
            "msgstr": "Texte multi lignes"
        }, {
            "msgid": "Radio buttons",
            "msgstr": "Boutons radios"
        }, {
            "msgid": "Tags list",
            "msgstr": "Liste de tags"
        }, {
            "msgid": "Is empty",
            "msgstr": "Est vide "
        }, {
            "msgid": "Is not empty",
            "msgstr": "Non vide"
        }, {
            "msgid": "is empty",
            "msgstr": "est vide"
        }, {
            "msgid": "is not empty",
            "msgstr": "non vide"
        }, {
            "msgid": "Greater than",
            "msgstr": "Plus grand que"
        }, {
            "msgid": "Lower than",
            "msgstr": "Plus petit que"
        }, {
            "msgid": "Equals",
            "msgstr": "Egal"
        }, {
            "msgid": "Different",
            "msgstr": "Différent"
        }, {
            "msgid": "Into",
            "msgstr": "Dans"
        }, {
            "msgid": "Contains",
            "msgstr": "Contient"
        }, {
            "msgid": "Starts with",
            "msgstr": "Commence par"
        }, {
            "msgid": "Ends with",
            "msgstr": "Termine par"
        }, {
            "msgid": "From...To",
            "msgstr": "Période"
        }, {
            "msgid": "Range",
            "msgstr": "Période"
        }, {
            "msgid": "Small",
            "msgstr": "Petit"
        }, {
            "msgid": "Medium",
            "msgstr": "Moyen"
        }, {
            "msgid": "Large",
            "msgstr": "Grand"
        }, {
            "msgid": "Extra large",
            "msgstr": "Très grand"
        }, {
            "msgid": "Multicolored",
            "msgstr": "Multicolore"
        }, {
            "msgid": "Start date",
            "msgstr": "Date de début"
        }, {
            "msgid": "End date",
            "msgstr": "Date de fin"
        }, {
            "msgid": "Smooth",
            "msgstr": "Lissage"
        }, {
            "msgid": "Markers",
            "msgstr": "Repères"
        }, {
            "msgid": "Background color",
            "msgstr": "Couleur de fond"
        }, {
            "msgid": "Cabinet XL",
            "msgstr": "Armoire XL"
        }, {
            "msgid": "Cabinet XS",
            "msgstr": "Armoire XS"
        }, {
            "msgid": "Cabinet XD",
            "msgstr": "Armoire XD"
        }, {
            "msgid": "Cabinet XLW",
            "msgstr": "Armoire XLW"
        }, {
            "msgid": "Cabinet XDS",
            "msgstr": "Armoire XDS"
        }, {
            "msgid": "PDA",
            "msgstr": "PDA"
        }, {
            "msgid": "Tablet",
            "msgstr": "Tablette"
        }, {
            "msgid": "Mobile application",
            "msgstr": "Application mobile"
        }, {
            "msgid": "External system",
            "msgstr": "Système externe"
        }, {
            "msgid": "Nexport",
            "msgstr": "Nexport"
        }, {
            "msgid": "Reading station",
            "msgstr": "Station de lecture"
        }, {
            "msgid": "Free input",
            "msgstr": "Code libre"
        }, {
            "msgid": "RFID Tag",
            "msgstr": "Tag RFID"
        }, {
            "msgid": "Alphanumeric input",
            "msgstr": "Code alphanumérique"
        }, {
            "msgid": "Weightpad code",
            "msgstr": "Code de Peson"
        }, {
            "msgid": "QR code",
            "msgstr": "QR code"
        }, {
            "msgid": "Bar code",
            "msgstr": "Code-barres"
        }, {
            "msgid": "Code type",
            "msgstr": "Type de code"
        }, {
            "msgid": "Add RFID code",
            "msgstr": "Ajouter un code"
        },
        "============== USER MESSAGES ==============",
        {
            "msgid": "This file must be an image",
            "msgstr": "Ce fichier doit être une image"
        }, {
            "msgid": "Server error",
            "msgstr": "Erreur du serveur"
        }, {
            "msgid": "Search in progress...",
            "msgstr": "Recherche en cours..."
        }, {
            "msgid": "No result!",
            "msgstr": "Aucun résultat !"
        }, {
            "msgid": "File must be in .pdf format.",
            "msgstr": "Le fichier doit être au format .pdf"
        }, {
            "msgid": "File must be in .csv format.",
            "msgstr": "Le fichier doit être au format .csv"
        }, {
            "msgid": "This file must be in spreadsheet format",
            "msgstr": "Ce fichier doit être une feuille de calcul"
        }, {
            "msgid": "Select file (.csv, .xls, .xlsx)",
            "msgstr": "Sélectionnez un fichier (.csv, .xls, .xlsx)"
        }, {
            "msgid": "This file must be an image (.jpg, .png, .gif).",
            "msgstr": "Le fichier doit être une image (.jpg, .png, .gif)."
        }, {
            "msgid": "This field can only contain integers.",
            "msgstr": "Seuls les nombres entiers sont autorisés"
        }, {
            "msgid": "Connection failed with server!",
            "msgstr": "La connexion avec le serveur a été perdue !"
        }, {
            "msgid": "Error",
            "msgstr": "Erreur"
        }, {
            "msgid": "This field can only contain alphanumeric characters.",
            "msgstr": "Seuls les caractères alphanumériques sont autorisés."
        }, {
            "msgid": "Do you really want to delete",
            "msgstr": "Voulez-vous vraiment supprimer"
        }, {
            "msgid": "Do you really want to delete ",
            "msgstr": "Voulez-vous vraiment supprimer "
        }, {
            "msgid": "Failed to process",
            "msgstr": "Echec de la procédure"
        }, {
            "msgid": "Unknown error",
            "msgstr": "Erreur inconnue"
        }, {
            "msgid": "Select image",
            "msgstr": "Délectionnez une image"
        }, {
            "msgid": "Form not valid!",
            "msgstr": "Un champ obligatoire n'est pas renseigné !"
        }, {
            "msgid": "No element selected",
            "msgstr": "Aucun élément sélectionné "
        }, {
            "msgid": "Server unavailable!",
            "msgstr": "Serveur non disponible !"
        }, {
            "msgid": "The lower threshold must be less than or equal to the upper threshold.",
            "msgstr": "Le niveau bas doit être inférieur au niveau haut."
        }, {
            "msgid": "Min value can't be greater than Max value",
            "msgstr": "La valeur minimale ne peut pas être supérieure à la valeur maximale"
        },       
        {
            "msgid": "Min value can't be greater than Secu value",
            "msgstr": "La valeur minimale ne peut pas être supérieure à la valeur de sécurité"
        },
         {
            "msgid": "Are you sure?",
            "msgstr": "Etes-vous certain ?"
        }, {
            "msgid": "This field can only contain numeric characters.",
            "msgstr": "Ce champs ne peut contenir que des caractères numériques."
        },
        "============== DASHBOARD ==============",
        {
            "msgid": "Bar graph editor",
            "msgstr": "Edition d'histogramme"
        }, {
            "msgid": "Donut widget editor",
            "msgstr": "Edition de Donuts"
        }, {
            "msgid": "Line editor",
            "msgstr": "Edition de courbes"
        }, {
            "msgid": "Pie widget editor",
            "msgstr": "Edition de camemberts"
        }, {
            "msgid": "Post-it widget editor",
            "msgstr": "Edition de Post-it"
        }, {
            "msgid": "Stacked bar graph editor",
            "msgstr": "Edition de diagrammes superposés"
        }, {
            "msgid": "Horizontal bar graph editor",
            "msgstr": "Edition de diagrammes horizontaux"
        }, {
            "msgid": "Dashboard",
            "msgstr": "Tableau de bord"
        }, {
            "msgid": "Dashboards",
            "msgstr": "Tableaux de bords"
        }, {
            "msgid": "Information",
            "msgstr": "Information"
        }, {
            "msgid": "Size",
            "msgstr": "Taille"
        }, {
            "msgid": "save",
            "msgstr": "enregistrer"
        }, {
            "msgid": "cancel",
            "msgstr": "annuler"
        }, {
            "msgid": "Widget title",
            "msgstr": "Titre du widget"
        }, {
            "msgid": "Statistics",
            "msgstr": "Statistiques"
        }, {
            "msgid": "Short labels",
            "msgstr": "Labels courts"
        }, {
            "msgid": "Last week",
            "msgstr": "Semaine précédente"
        }, {
            "msgid": "Last month",
            "msgstr": "Mois précédent"
        }, {
            "msgid": "last 3 months",
            "msgstr": "Trimestre précédent"
        }, {
            "msgid": "last 6 months",
            "msgstr": "Semestre précédent"
        }, {
            "msgid": "Last year",
            "msgstr": "Année précédente"
        }, {
            "msgid": "Last 3 years",
            "msgstr": "3 années précédentes"
        }, {
            "msgid": "None",
            "msgstr": "Non"
        }, {
            "msgid": "Date to date",
            "msgstr": "Date à date"
        }, {
            "msgid": "Indicator",
            "msgstr": "Indicateur"
        }, {
            "msgid": "Indicator title",
            "msgstr": "Titre de l'indicateur"
        }, {
            "msgid": "My widget",
            "msgstr": "Mon widget"
        }, {
            "msgid": "Chart",
            "msgstr": "Graphique"
        }, {
            "msgid": "X title",
            "msgstr": "Titre X"
        }, {
            "msgid": "Y title",
            "msgstr": "Titre Y"
        }, {
            "msgid": "Grid",
            "msgstr": "Grille"
        }, {
            "msgid": "Period",
            "msgstr": "Période"
        }, {
            "msgid": "Limit",
            "msgstr": "Limite"
        }, {
            "msgid": "Sort",
            "msgstr": "Tri"
        }, {
            "msgid": "Ascendant",
            "msgstr": "Ascendant"
        }, {
            "msgid": "Descendant",
            "msgstr": "Descendant"
        }, {
            "msgid": "Attribute",
            "msgstr": "Attribut"
        }, {
            "msgid": "Calcul by",
            "msgstr": "Calcul par"
        }, {
            "msgid": "Elements",
            "msgstr": "Eléments"
        }, {
            "msgid": "Sorted",
            "msgstr": "Trié"
        }, {
            "msgid": "Device",
            "msgstr": "Périphérique"
        }, {
            "msgid": "Are you sure you want to delete this indicator",
            "msgstr": "Voullez-vous vraiment supprimer cet indicateur"
        }, {
            "msgid": "Are you sure you want to delete this dashboard?",
            "msgstr": "Voullez-vous vraiment supprimer ce tableau de bord ?"
        }, {
            "msgid": "Author",
            "msgstr": "Auteur"
        }, {
            "msgid": "Menu label",
            "msgstr": "Label du menu"
        }, {
            "msgid": "Dashboard scene editor",
            "msgstr": "Création d'un tableau de bord"
        }, {
            "msgid": "Periodicity",
            "msgstr": "Périodicité"
        }, {
            "msgid": "Without address",
            "msgstr": "Sans adresse"
        }, {
            "msgid": "Filled",
            "msgstr": "Plein",
            "msgctx": "chart"
        }, {
            "msgid": "Filling",
            "msgstr": "Remplissage"
        },
        "============== THUMBAILS / PICTURES ==============",
        {
            "msgid": "Select new thumbnail",
            "msgstr": "Sélectionner une vignette"
        }, {
            "msgid": "Delete thumbnail",
            "msgstr": "Supprimer la vignette"
        },
        "============== LOGIN / LOGOUT ==============",
        {
            "msgid": "Sign into your account",
            "msgstr": "Accès à votre compte"
        }, {
            "msgid": "password",
            "msgstr": "mot de passe"
        }, {
            "msgid": "login",
            "msgstr": "login"
        }, {
            "msgid": "Update Password and Login",
            "msgstr": "Mise à jour du mot de passe"
        }, {
            "msgid": "User login",
            "msgstr": "Connexion"
        }, {
            "msgid": "Incorrect login and / or password",
            "msgstr": "Identifiant et/ou mot de passe erroné"
        }, {
            "msgid": "Please, choose a new password.",
            "msgstr": "Veuillez choisir un nouveau mot de passe."
        }, {
            "msgid": "This password is already in use!",
            "msgstr": "Ce mot de passe est déjà utilisé !"
        }, {
            "msgid": "Passwords are not the same!",
            "msgstr": "Les mots de passe ne sont pas identiques !"
        }, {
            "msgid": "The new password is missing!",
            "msgstr": "Le nouveau mot de passe est manquant !"
        }, {
            "msgid": "This badge number is already in use!",
            "msgstr": "Ce numéro de badge est déjà utilisé !"
        }, {
            "msgid": "Password expired!",
            "msgstr": "Le mot de passe a expiré !"
        }, {
            "msgid": "Deleted user",
            "msgstr": "Cet utilisateur a été supprimé (dans le système)"
        }, {
            "msgid": "User sticker : wrong format",
            "msgstr": "Identifiant : mauvais format."
        }, {
            "msgid": "User badge number unknow",
            "msgstr": "Badge utilisateur inconnu !"
        }, {
            "msgid": "User account locked",
            "msgstr": "Compte utilisateur vérouillé !"
        }, {
            "msgid": "User has on going operation",
            "msgstr": "Cet utilisateur a des opération en cours."
        }, {
            "msgid": "Maximum sessions for this principal exceeded",
            "msgstr": "Nombre maximum de sessions dépassé !"
        }, {
            "msgid": "User not exists",
            "msgstr": "Utilisateur inconnu."
        }, {
            "msgid": "User already connected",
            "msgstr": "Utilisateur déjà connecté !"
        },
        "============== CLIENT WEB CONFIGURATION ==============",
        {
            "msgid": "Album configuration",
            "msgstr": "Configuration des albums"
        }, {
            "msgid": "View grid configuration",
            "msgstr": "Configuration des grilles"
        }, {
            "msgid": "Column configuration",
            "msgstr": "Configuration des colonnes"
        }, {
            "msgid": "Grid configuration",
            "msgstr": "Configuration du tableau"
        }, {
            "msgid": "List configuration",
            "msgstr": "Configuration de la liste"
        }, {
            "msgid": "Displaying",
            "msgstr": "Affichage"
        }, {
            "msgid": "Row numbers",
            "msgstr": "Numérotation"
        }, {
            "msgid": "Thumbnails",
            "msgstr": "Vignette"
        }, {
            "msgid": "Columns",
            "msgstr": "Colonne"
        }, {
            "msgid": "Expanded rows",
            "msgstr": "Lignes étendues"
        }, {
            "msgid": "New property",
            "msgstr": "Nouvelle propriété"
        }, {
            "msgid": "Filters",
            "msgstr": "Filtres"
        }, {
            "msgid": "Rows",
            "msgstr": "Lignes"
        }, {
            "msgid": "New information",
            "msgstr": "Nouvelle information"
        }, {
            "msgid": "color",
            "msgstr": "couleur"
        }, {
            "msgid": "background",
            "msgstr": "illustration"
        }, {
            "msgid": "logo",
            "msgstr": "logo"
        }, {
            "msgid": "title",
            "msgstr": "titre"
        }, {
            "msgid": "reset",
            "msgstr": "réinitialisation"
        }, {
            "msgid": "Extended row configuration",
            "msgstr": "Configuration des lignes étendues"
        }, {
            "msgid": "Row configuration",
            "msgstr": "Configuration des lignes"
        }, {
            "msgid": "Title",
            "msgstr": "Titre"
        }, {
            "msgid": "Size auto",
            "msgstr": "Taille auto"
        }, {
            "msgid": "Cell wrap",
            "msgstr": "Multilignes"
        }, {
            "msgid": "Sortable",
            "msgstr": "Tri activé"
        }, {
            "msgid": "Hidden",
            "msgstr": "Caché"
        }, {
            "msgid": "Lockable",
            "msgstr": "Verrouillable"
        }, {
            "msgid": "Locked",
            "msgstr": "Verrouillé"
        }, {
            "msgid": "Are you sure that want to reset page configuration",
            "msgstr": "Etes-vous sûr de vouloir perdre la configuration de la page"
        }, {
            "msgid": "Warning: All data in the field will be permanently overwritten, are you sure you want to delete ",
            "msgstr": "Attention toutes les données du champ seront écrasées définitivement, êtes-vous sûr de vouloir supprimer "
        }, {
            "msgid": "My personal filters",
            "msgstr": "Mes filtres"
        }, {
            "msgid": "Client web global configuration",
            "msgstr": "Configuration globale du client web"
        }, {
            "msgid": "Displayed user property",
            "msgstr": "Propriété de l'utilisateur affichée"
        },
        "============== UI ==============",
        {
            "msgid": "m-d-Y",
            "msgstr": "d/m/Y"
        }, {
            "msgid": "m/d/Y H:i:s",
            "msgstr": "d/m/Y H:i:s"
        }, {
            "msgid": "m/d/Y",
            "msgstr": "d/m/Y"
        }, {
            "msgid": "Y-m-d",
            "msgstr": "d/m/Y"
        }, {
            "msgid": "Y-m-d H:i",
            "msgstr": "d/m/Y H:i"
        }, {
            "msgid": "Expected time format: MM:DD:YYYY",
            "msgstr": "Format attendu : JJ:MM:AAAA"
        }, {
            "msgid": "Expected time format: HH:MM",
            "msgstr": "Format attendu : HH:MM"
        }, {
            "msgid": "Label",
            "msgstr": "Label"
        }, {
            "msgid": "Description",
            "msgstr": "Description"
        }, {
            "msgid": "Level",
            "msgstr": "Level"
        }, {
            "msgid": ":",
            "msgstr": "&nbsp;:"
        }, {
            "msgid": "colon",
            "msgstr": " :"
        }, {
            "msgid": ";",
            "msgstr": "&nbsp;;"
        }, {
            "msgid": "!",
            "msgstr": "&nbsp;!"
        }, {
            "msgid": "?",
            "msgstr": "&nbsp;?"
        }, {
            "msgid": ",",
            "msgstr": ","
        }, {
            "msgid": "Reset",
            "msgstr": "Reset"
        }, {
            "msgid": "Display datasheet",
            "msgstr": "Affichage de la fiche de vie"
        }, {
            "msgid": "Export to file",
            "msgstr": "Exporter un fichier"
        }, {
            "msgid": "Characteristics",
            "msgstr": "Caractéristiques"
        }, {
            "msgid": "Traceability",
            "msgstr": "Traçabilité"
        }, {
            "msgid": "Control",
            "msgstr": "Contrôle"
        }, {
            "msgid": "Attachments",
            "msgstr": "Pièces jointes"
        }, {
            "msgid": "Download",
            "msgstr": "Télécharger"
        }, {
            "msgid": "Files",
            "msgstr": "Fichiers"
        }, {
            "msgid": "Add File attachments",
            "msgstr": "Ajouter des pièces jointes"
        }, {
            "msgid": "File attachments",
            "msgstr": "Pièces jointes"
        }, {
            "msgid": "Image editor",
            "msgstr": "Sélection d'images"
        }, {
            "msgid": "Save",
            "msgstr": "Enregistrer"
        }, {
            "msgid": "Cancel",
            "msgstr": "Annuler"
        }, {
            "msgid": "Configuration",
            "msgstr": "Configuration"
        }, {
            "msgid": "Empty",
            "msgstr": "Vide"
        }, {
            "msgid": "Delete",
            "msgstr": "Supprimer"
        }, {
            "msgid": "Edit",
            "msgstr": "Modifier"
        }, {
            "msgid": "Yes",
            "msgstr": "Oui"
        }, {
            "msgid": "No",
            "msgstr": "Non"
        }, {
            "msgid": "Alert",
            "msgstr": "Alerte"
        }, {
            "msgid": "Add",
            "msgstr": "Ajouter"
        }, {
            "msgid": "Upload",
            "msgstr": "Envoyer"
        }, {
            "msgid": "disabled",
            "msgstr": "désactivé"
        }, {
            "msgid": "Select",
            "msgstr": "Sélectionner"
        }, {
            "msgid": "Results",
            "msgstr": "Résultat"
        }, {
            "msgid": "No results!",
            "msgstr": "Aucun résultat !"
        }, {
            "msgid": "Duplicate",
            "msgstr": "Dupliquer"
        }, {
            "msgid": "Toggle",
            "msgstr": "Activation"
        }, {
            "msgid": "Create",
            "msgstr": "Créer"
        },
        "============== FILTERS ==============",
        {
            "msgid": "Filter",
            "msgstr": "Filtre"
        }, {
            "msgid": "filters",
            "msgstr": "filtres"
        }, {
            "msgid": "Create new filter",
            "msgstr": "Nouveau filtre"
        }, {
            "msgid": "Edit filter",
            "msgstr": "Modifier le filtre"
        }, {
            "msgid": "Filters configuration",
            "msgstr": "Configuration des filtres"
        }, {
            "msgid": "New filter",
            "msgstr": "Nouveau filtre"
        }, {
            "msgid": "Comparison",
            "msgstr": "Comparaison"
        }, {
            "msgid": "Dates range",
            "msgstr": "Période"
        }, {
            "msgid": "Multiple comboBox",
            "msgstr": "Menu déroulant"
        }, {
            "msgid": "from",
            "msgstr": "Du"
        }, {
            "msgid": "to",
            "msgstr": "Au"
        }, {
            "msgid": "Last update date",
            "msgstr": "Dernière mise à jour"
        }, {
            "msgid": "Combo Item - Reference - Category",
            "msgstr": "Combo Article - Réference - Categorie"
        }, {
            "msgid": "Start date must be less than end date",
            "msgstr": "La date de début doit précéder la date de fin."
        }, {
            "msgid": "Dates times range",
            "msgstr": "Période (date, heure)"
        }, {
            "msgid": "Operation date time",
            "msgstr": "Date et heure de l'opération"
        },
        "============== DYNAMIC PROPERTIES ==============",
        {
            "msgid": "Properties",
            "msgstr": "Propriétés"
        }, {
            "msgid": "Property",
            "msgstr": "Propriété"
        }, {
            "msgid": "Create new property",
            "msgstr": "Créer une propriété"
        }, {
            "msgid": "Create a property",
            "msgstr": "Créer une propriété"
        }, {
            "msgid": "Valorisation",
            "msgstr": "Valorisation"
        }, {
            "msgid": "Edit property",
            "msgstr": "Modifier une propriété"
        }, {
            "msgid": "Width",
            "msgstr": "Largeur"
        }, {
            "msgid": "Label",
            "msgstr": "Label"
        }, {
            "msgid": "Description",
            "msgstr": "Description"
        }, {
            "msgid": "Min chars",
            "msgstr": "Nb caractères min"
        }, {
            "msgid": "Max chars",
            "msgstr": "Nb caractères max"
        }, {
            "msgid": "Alphanumeric",
            "msgstr": "Alphanumérique"
        }, {
            "msgid": "Height",
            "msgstr": "Hauteur"
        }, {
            "msgid": "Min value",
            "msgstr": "Valeur min"
        }, {
            "msgid": "Max value",
            "msgstr": "Valeur max"
        }, {
            "msgid": "Step",
            "msgstr": "Pas"
        }, {
            "msgid": "Allow decimals",
            "msgstr": "Décimales autorisées"
        }, {
            "msgid": "Decimal precision",
            "msgstr": "Précision de la décimale"
        }, {
            "msgid": "Limit to current date",
            "msgstr": "Limiter à la date courante"
        }, {
            "msgid": "Increment",
            "msgstr": "Incrément"
        }, {
            "msgid": "Checked",
            "msgstr": "Cochée"
        }, {
            "msgid": "Horizontal",
            "msgstr": "Horizontal"
        }, {
            "msgid": "Vertical",
            "msgstr": "Vertical"
        }, {
            "msgid": "Buttons labels",
            "msgstr": "Noms des boutons"
        }, {
            "msgid": "Tags",
            "msgstr": "Tags"
        }, {
            "msgid": "Dynamic properties",
            "msgstr": "Propriétés dynamiques"
        }, {
            "msgid": "Text area",
            "msgstr": "Zone de texte"
        }, {
            "msgid": "Radio button",
            "msgstr": "Bouton radio"
        }, {
            "msgid": "Text",
            "msgstr": "Texte simple"
        }, {
            "msgid": "Textarea",
            "msgstr": "Zone de texte"
        }, {
            "msgid": "List",
            "msgstr": "Liste"
        }, {
            "msgid": "Slider",
            "msgstr": "Curseur"
        }, {
            "msgid": "Editable",
            "msgstr": "Modifiable"
        }, {
            "msgid": "Editable value",
            "msgstr": "La valeur est modifiable"
        }, {
            "msgid": "Displayable",
            "msgstr": "Affichable"
        }, {
            "msgid": "Displayed on devices",
            "msgstr": "Affiché sur les périphériques"
        }, {
            "msgid": "Linked object",
            "msgstr": "Valorisation"
        }, {
            "msgid": "Field type",
            "msgstr": "Type de champ"
        }, {
            "msgid": "Owner",
            "msgstr": "Propriétaire"
        }, {
            "msgid": "Owners",
            "msgstr": "Possesseur"
        }, {
            "msgid": "Items property",
            "msgstr": "Propriété d'article"
        }, {
            "msgid": "References property",
            "msgstr": "Propriété de référence"
        }, {
            "msgid": "Default options",
            "msgstr": "Options par défaut"
        }, {
            "msgid": "Required",
            "msgstr": "Obligatoire"
        }, {
            "msgid": "Usable in tables",
            "msgstr": "Sélectionnable dans les tableaux"
        }, {
            "msgid": "Usable in details",
            "msgstr": "Visible dans les fiches de détail"
        }, {
            "msgid": "Usable in filters",
            "msgstr": "Sélectionnable dans les filtres"
        }, {
            "msgid": "Usable in controls",
            "msgstr": "Sélectionnable dans les contrôles spécifiques"
        }, {
            "msgid": "Preview",
            "msgstr": "Prévisualisation"
        }, {
            "msgid": "Current state",
            "msgstr": "Etat"
        }, {
            "msgid": "Select a field type",
            "msgstr": "Choisir un type de champ"
        }, {
            "msgid": "Combo Items",
            "msgstr": "Eléments"
        }, {
            "msgid": "Dynamic properties selection",
            "msgstr": "Sélection des propriétés dynamiques"
        }, {
            "msgid": "This dynamic proprety is not editable",
            "msgstr": "Cette propriété dynamique n'est pas modifiable"
        }, {
            "msgid": "Null",
            "msgstr": "Non renseigné"
        }, {
            "msgid": "Select a reference property",
            "msgstr": "Sélectionnez une propriété de référence"
        }, {
            "msgid": "Select an item property",
            "msgstr": "Sélectionnez une propriété d'article"
        }, {
            "msgid": "Create a reference property",
            "msgstr": "Créer une propriété de référence"
        }, {
            "msgid": "Create an item property",
            "msgstr": "Créer une propriété d'article"
        }, {
            "msgid": "Create a property",
            "msgstr": "Créer une propriété"
        }, {
            "msgid": "Edit a reference property",
            "msgstr": "Modifier une propriété de référence"
        }, {
            "msgid": "Edit an item property",
            "msgstr": "Modifier une propriété d'article"
        }, {
            "msgid": "Edit a property",
            "msgstr": "Modifier une propriété"
        }, {
            "msgid": "In service",
            "msgstr": "En service"
        }, {
            "msgid": "To verify",
            "msgstr": "A vérifier"
        }, {
            "msgid": "Out of order",
            "msgstr": "Hors service"
        }, {
            "msgid": "Undefined",
            "msgstr": "Non-défini"
        }, {
            "msgid": "Property is used by these",
            "msgstr": "La propriété est utilisée par ces"
        }, {
            "msgid": "Dynamic property already exists",
            "msgstr": "Cette propriété dynamique existe déjà"
        }, {
            "msgid" : "Dynamic properies configuration are not be duplicated",
            "msgstr" : "La configuration des propriétés dynamiques ne sera pas dupliquée"
        }, {
            "msgid": "User property",
            "msgstr": "Propriété d'utilisateur"
        }, {
            "msgid": "Location property",
            "msgstr": "Propriété d'emplacement"
        }, {
            "msgid": "Impossible to edit a System property",
            "msgstr": "Une propriété système n'est pas modifiable"
        }, {
            "msgid": "Attention, all elements with an old value of this property will have to be valued with the new values.",
            "msgstr": "Attention, tous les éléments possédant une ancienne valeur de cette propriété devront être valorisés avec les nouvelles valeurs."
        }, {
            "msgid": "Filter configuration",
            "msgstr": "Configuration du filtre"
        }, {
            "msgid": "Value filled",
            "msgstr": "Valeur renseignée"
        },{
            "msgid": "Value",
            "msgstr": "Valeur"
        }, {
            "msgid": "Filled",
            "msgstr": "Renseignée"
        }, {
            "msgid": "Not filled",
            "msgstr": "Non renseignée"
        }, {
            "msgid": "This property is wrong.",
            "msgstr": "Cette propriété est erronée."
        }, {
            "msgid": "Please enter an item!",
            "msgstr": "Merci de saisir au moins un élément !"
        },
        "============== SERVER CONFIG ==============",
        {
            "msgid": "Server configuration",
            "msgstr": "Configuration du serveur"
        }, {
            "msgid": "Server",
            "msgstr": "Serveur"
        }, {
            "msgid": "Domain",
            "msgstr": "Domaine"
        }, {
            "msgid": "Key",
            "msgstr": "Clé"
        }, {
            "msgid": "Value",
            "msgstr": "Valeur"
        }, {
            "msgid": "Alerts configuration",
            "msgstr": "Configuration des alertes"
        }, {
            "msgid": "Raised by ongoing operation",
            "msgstr": "Levée sur une opération"
        }, {
            "msgid": "This alert should be deleted",
            "msgstr": "Cette alerte peut être supprimée"
        }, {
            "msgid": "Low",
            "msgstr": "Bas"
        }, {
            "msgid": "Medium",
            "msgstr": "Moyen"
        }, {
            "msgid": "High",
            "msgstr": "Haut"
        }, {
            "msgid": "Edit a configuration",
            "msgstr": "Modifier la configuration"
        }, {
            "msgid": "Web client",
            "msgstr": "Client web"
        },
        "============== NOTIFICATION MAIL CONFIG ==============",
        {
            "msgid": "Notif Mail configuration",
            "msgstr": "Configuration des notifications par e-mail"
        }, {
            "msgid": "Notif mails",
            "msgstr": "Notification e-mail"
        }, {
            "msgid": "Periodicity",
            "msgstr": "Périodicité"
        }, {
            "msgid": "Action",
            "msgstr": "Action"
        }, {
            "msgid": "E-Mail from",
            "msgstr": "E-mail de"
        }, {
            "msgid": "Mail header",
            "msgstr": "Entête"
        }, {
            "msgid": "Mail footer",
            "msgstr": "Pied de page"
        }, {
            "msgid": "Send test",
            "msgstr": "Envoyer un test"
        }, {
            "msgid": "Days of the week",
            "msgstr": "Jour de la semaine"
        }, {
            "msgid": "Day",
            "msgstr": "Jour"
        }, {
            "msgid": "Hour",
            "msgstr": "Heure"
        }, {
            "msgid": "Minutes",
            "msgstr": "Minutes"
        }, {
            "msgid": "Failed loading default configuration",
            "msgstr": "La configuration par défaut est introuvable"
        },
        "============== TRIGGER ENUMS ==============",
        {
            "msgid": "Borrow a material",
            "msgstr": "Emprunt d'un article"
        }, {
            "msgid": "Return a material",
            "msgstr": "Retour d'un article"
        }, {
            "msgid": "Send a material",
            "msgstr": "Envoi d'un article"
        }, {
            "msgid": "Receive a material",
            "msgstr": "Réception d'un article"
        }, {
            "msgid": "Move a material",
            "msgstr": "Déplacement d'un article"
        }, {
            "msgid": "Use a material",
            "msgstr": "Consommation d'un article"
        }, {
            "msgid": "Assign a tag to a material",
            "msgstr": "Association de tag à un article"
        }, {
            "msgid": "Any movement operation",
            "msgstr": "Toutes opérations de déplacements"
        }, {
            "msgid": "Remove a material for maintenance",
            "msgstr": "Départ en maintenance"
        }, {
            "msgid": "Return a material for  maintenance",
            "msgstr": "Retour de maintenance"
        }, {
            "msgid": "Remove a material for calibration",
            "msgstr": "Départ en étalonnage"
        }, {
            "msgid": "Return a material for calibration",
            "msgstr": "Retour d'étalonnage"
        }, {
            "msgid": "Edit a material sheet",
            "msgstr": "Edition d'un article"
        }, 
        {
            "msgid": "Create a stock level",
            "msgstr": "Création d'un niveau de stock"
        }, 
        {
            "msgid": "Edit a stock level",
            "msgstr": "Edition d'un niveau de stock"
        }, 
        {
            "msgid": "Delete a stock level",
            "msgstr": "Suppression d'un niveau de stock"
        }, 
        {
            "msgid": "Change of day",
            "msgstr": "Changement de jour"
        }, {
            "msgid": "Create a specific control",
            "msgstr": "Création d'un contrôle spécifique"
        }, {
            "msgid": "Time change",
            "msgstr": "Changement d'heure"
        }, {
            "msgid": "List of borrowings",
            "msgstr": "Liste d'emprunts"
        }, {
            "msgid": "Create or edit an item",
            "msgstr": "Create or edit an item"
        }, {
            "msgid": "Remove an item",
            "msgstr": "Remove an item"
        }, {
            "msgid": "Create an inventory",
            "msgstr": "Create an inventory"
        }, {
            "msgid": "Create or edit a stock",
            "msgstr": "Create or edit a stock"
        }, {
            "msgid": "Remove a stock",
            "msgstr": "Remove a stock"
        }, {
            "msgid": "Create or edit an user",
            "msgstr": "Create or edit an user"
        }, {
            "msgid": "Remove an user",
            "msgstr": "Remove an user"
        }, {
            "msgid": "Create or edit a localisation",
            "msgstr": "Create or edit a localisation"
        }, {
            "msgid": "Remove a localisation",
            "msgstr": "Remove a localisation"
        }, {
            "msgid": "Create or edit a device",
            "msgstr": "Create or edit a device"
        }, {
            "msgid": "Remove a device",
            "msgstr": "Remove a device"
        },
        "============== CARTOGRAPHY ==============",
        {
            "msgid": "CARTOGRAPHY",
            "msgstr": "CARTOGRAPHIE"
        },{
            "msgid": "Maps",
            "msgstr": "Plans"
        }, {
            "msgid": "Maps consultation",
            "msgstr": "Consultation des plans"
        }, {
            "msgid": "Maps management",
            "msgstr": "Gestion des plans"
        }, {
            "msgid": "Length",
            "msgstr": "Longueur",
            "msgctxt": "CARTO_MESURE"
        }, {
            "msgid": "Width",
            "msgstr": "Largeur",
            "msgctxt": "CARTO_MESURE"
        }, {
            "msgid": "Unit",
            "msgstr": "Unité"
        }, {
            "msgid": "Meter",
            "msgstr": "Mètre"
        }, {
            "msgid": "Reference source",
            "msgstr": "Référenciel"
        }, {
            "msgid": "Create a new map",
            "msgstr": "Créer une nouvelle carte"
        }, {
            "msgid": "New Map",
            "msgstr": "Nouvelle carte"
        }, {
            "msgid": "Add item",
            "msgstr": "Ajouter un article"
        }, {
            "msgid": "Color",
            "msgstr": "Couleur"
        }, {
            "msgid": "Position X",
            "msgstr": "Position X"
        }, {
            "msgid": "Position Y",
            "msgstr": "Position Y"
        }, {
            "msgid": "Map",
            "msgstr": "Plan"
        }, {
            "msgid": "Back",
            "msgstr": "Retour"
        }, {
            "msgid": "Snapshot",
            "msgstr": "Prendre une photo"
        }, {
            "msgid": "Edit map",
            "msgstr": "Editer le plan"
        }, {
            "msgid": "Add location",
            "msgstr": "Ajouter un emplacement"
        }, {
            "msgid": "Add device",
            "msgstr": "Ajouter un périphérique"
        }, {
            "msgid": "Add link to map",
            "msgstr": "Lien vers un plan"
        }, {
            "msgid": "Add label",
            "msgstr": "Ajouter un label"
        }, {
            "msgid": "Edit selected element",
            "msgstr": "Editer l'élément sélectionné"
        }, {
            "msgid": "Delete selected element",
            "msgstr": "Supprimer l'élément sélectionné"
        }, {
            "msgid": "Cartography",
            "msgstr": "Cartographie"
        }, {
            "msgid": "Looks",
            "msgstr": "Aspect"
        }, {
            "msgid": "Appearance",
            "msgstr": "Apparence"
        }, {
            "msgid": "Pin",
            "msgstr": "Epingle"
        }, {
            "msgid": "Zone",
            "msgstr": "Zone"
        }, {
            "msgid": "Coordinates",
            "msgstr": "Coordonnées"
        }, {
            "msgid": "Errors",
            "msgstr": "Erreurs"
        }, {
            "msgid": "This location has already been located",
            "msgstr": "Cet emplacement a dèjà été placé sur le plan"
        }, {
            "msgid": "Success",
            "msgstr": "Succès"
        }, {
            "msgid": "Show map",
            "msgstr": "Afficher le plan"
        }, {
            "msgid": "Configure Map",
            "msgstr": "Configuration du plan"
        }, {
            "msgid": "Item's displaying Rules",
            "msgstr": "Règles d'affichage des articles"
        }, {
            "msgid": "Materials layer configuration",
            "msgstr": "Configuration des articles"
        }, {
            "msgid": "Default color",
            "msgstr": "Couleur par défaut"
        }, {
            "msgid": "Information bubble",
            "msgstr": "Bulle d'information"
        }, {
            "msgid": "Devices layer configuration",
            "msgstr": "Configuration des périphériques"
        }, {
            "msgid": "Locations layer configuration",
            "msgstr": "Configuration des emplacements"
        }, {
            "msgid": "Links layer configuration",
            "msgstr": "Configuration des liens"
        }, {
            "msgid": "Labels layer configuration",
            "msgstr": "Configuration des labels"
        }, {
            "msgid": "Create new displaying rule",
            "msgstr": "Créer des règles d'affichage"
        }, {
            "msgid": "New Rule",
            "msgstr": "Nouvelle règle"
        }, {
            "msgid": "Result",
            "msgstr": "Résultat"
        }, {
            "msgid": "Map configuration",
            "msgstr": "Configuration du plan"
        }, {
            "msgid": "Layers displaying",
            "msgstr": "Affichage des calques"
        }, {
            "msgid": "This item has already been located",
            "msgstr": "Cet article est déjà présent sur le plan"
        }, {
            "msgid": "Edit link to map",
            "msgstr": "Edition d'un lien"
        }, {
            "msgid": "Add link",
            "msgstr": "Ajouter un lien"
        }, {
            "msgid": "Link Color",
            "msgstr": "Couleur"
        }, {
            "msgid": "Items count",
            "msgstr": "Nb d'articles"
        }, {
            "msgid": "Locations count",
            "msgstr": "Nb d'emplacements"
        }, {
            "msgid": "Devices count",
            "msgstr": "Nb de périphériques"
        }, {
            "msgid": "Devices can't be modified",
            "msgstr": "Les périphériques ne sont pas modifiables."
        }, {
            "msgid": "Edit location",
            "msgstr": "Edition d'un emplacement"
        }, {
            "msgid": "Edit item",
            "msgstr": "Edition d'un article"
        }, {
            "msgid": "This device has already been located",
            "msgstr": "Ce périphérique est déjà présent sur le plan"
        }, {
            "msgid": "A map must not be linked to itself",
            "msgstr": "Une carte ne peut être liée à elle-même"
        }, {
            "msgid": "Display label",
            "msgstr": "Affichage du label"
        }, {
            "msgid": "Display elements names",
            "msgstr": "Afficher les noms d'éléments"
        }, {
            "msgid": "Global configuration",
            "msgstr": "Configuration générale"
        }, {
            "msgid": "The map is missing",
            "msgstr": "La carte est manquante !"
        }, {
            "msgid": "GeoLoc referential",
            "msgstr": "Zone de référence"
        }, {
            "msgid": "Linked position",
            "msgstr": "Localisation liée"
        }, {
            "msgid": "Size of the real reference area",
            "msgstr": "Taille de la zone de référence"
        }, {
            "msgid": "Layers management",
            "msgstr": "Gestion des calques"
        }, {
            "msgid": "Error occured with filter!",
            "msgstr": "Le filtre est erroné !"
        }, {
            "msgid": "Error occured with rule, check property configuration!",
            "msgstr": "La règle est erronée, vérifiez la configuration des propriétés !"
        }, {
            "msgid": "Font",
            "msgstr": "Police"
        }, {
            "msgid": "Geolocalization",
            "msgstr": "Geolocalisation"
        }, {
            "msgid": "Outdoor",
            "msgstr": "Carte"
        }, {
            "msgid": "outdoor geolocalization for material",
            "msgstr": "Geolocalisation d'article"
        },
        "============== MULTI SITES ==============",
        {
            "msgid": "Contexts",
            "msgstr": "Contextes"
        }, {
            "msgid": "Context",
            "msgstr": "Contexte"
        }, {
            "msgid": "Select context",
            "msgstr": "Sélectionner un contexte"
        }, {
            "msgid": "Context management",
            "msgstr": "Gestion des contextes"
        }, {
            "msgid": "Change context",
            "msgstr": "Changement de contexte"
        }, {
            "msgid": "Create a context",
            "msgstr": "Créer un contexte"
        }, {
            "msgid": "Edit a context",
            "msgstr": "Editer un contexte"
        }, {
            "msgid": "Site",
            "msgstr": "Site"
        }, {
            "msgid": "Allowed devices",
            "msgstr": "Périphériques autorisés"
        }, {
            "msgid": "Select context",
            "msgstr": "Sélectionnez un contexte"
        }, {
            "msgid": "Multi-Context",
            "msgstr": "Multi-Contexte"
        }, {
            "msgid": "Restricts dynamic properties",
            "msgstr": "Limite les propriétés dynamiques"
        }, {
            "msgid": "Restricts items",
            "msgstr": "Limite les articles"
        }, {
            "msgid": "Select a location",
            "msgstr": "Sélectionnez un emplacement"
        }, {
            "msgid": "Select an item",
            "msgstr": "Sélection d'articles"
        }, {
            "msgid": "Select a property",
            "msgstr": "Sélection de propriétés dynamiques"
        }, {
            "msgid": "Restrictions",
            "msgstr": "Restrictions"
        }, {
            "msgid": "Device selection",
            "msgstr": "Sélection de périphériques"
        },
        "============== IMPORTS ==============",
        {
            "msgid": "Import",
            "msgstr": "Import"
        }, {
            "msgid": "Imports",
            "msgstr": "Imports"
        }, {
            "msgid": "Import files",
            "msgstr": "Importer des fichiers"
        }, {
            "msgid": "Delimiter",
            "msgstr": "Séparateur"
        }, {
            "msgid": "Import a file",
            "msgstr": "Importer"
        }, {
            "msgid": "File name",
            "msgstr": "Nom du fichier"
        }, {
            "msgid": "Author",
            "msgstr": "Auteur"
        }, {
            "msgid": "Number of computed lines",
            "msgstr": "Nombre de lignes parcourues"
        }, {
            "msgid": "Elements created",
            "msgstr": "Elements créés"
        }, {
            "msgid": "Number of users created",
            "msgstr": "Nombre d'utilisateurs créés"
        }, {
            "msgid": "Number of locations created",
            "msgstr": "Nombre d'emplacements créés"
        }, {
            "msgid": "Number of positions created",
            "msgstr": "Nombre de positions créées"
        }, {
            "msgid": "Number of references created",
            "msgstr": "Nombre de références créées"
        }, {
            "msgid": "Number of categories created",
            "msgstr": "Nombre de catégories créées"
        }, {
            "msgid": "Number of items created",
            "msgstr": "Nombre d'articles créés"
        }, {
            "msgid": "Number of existing items",
            "msgstr": "Nombre d'articles existants"
        }, {
            "msgid": "Number of updated items",
            "msgstr": "Nombre d'articles mis à jour"
        }, {
            "msgid": "Number of deleted items",
            "msgstr": "Nombre d'articles supprimés"
        }, {
            "msgid": "Errors list",
            "msgstr": "Liste d'erreurs"
        },  {
            "msgid": "The file has been sent ...",
            "msgstr": "Le fichier a bien été envoyé ..."
        }, {
            "msgid": "Manage imports",
            "msgstr": "Import de données"
        }, {
            "msgid": "Number of processed lines",
            "msgstr": "Nombre de lignes traitées"
        }, {
            "msgid": "Number of mistaken lines",
            "msgstr": "Nombre de lignes erronées"
        }, {
            "msgid": "Number of ingnored lines",
            "msgstr": "Nombre de lignes ignorées"
        }, {
            "msgid": "Import status",
            "msgstr": "Etat d'importation"
        }, {
            "msgid": "Processed lines",
            "msgstr": "Lignes traitées"
        }, {
            "msgid": "Mistaken lines",
            "msgstr": "Lignes erronées"
        }, {
            "msgid": "Ignored lines",
            "msgstr": "Lignes ignorées"
        }, {
            "msgid": "Done",
            "msgstr": "Terminé",
            "msgctx": "importStatus"
        }, {
            "msgid": "InProgress",
            "msgstr": "En cours",
            "msgctx": "importStatus"
        },
        "============== PLUGINS MANAGEMENT ==============",
        {
            "msgid": "Plug-ins",
            "msgstr": "Plugins"
        }, {
            "msgid": "Initialized",
            "msgstr": "Initialisé"
        }, {
            "msgid": "Plug-ins administration",
            "msgstr": "Gestion des plugins"
        }, {
            "msgid": "Plug-in",
            "msgstr": "Plugin"
        }, {
            "msgid": "Add plug-in",
            "msgstr": "Ajouter un plugin"
        }, {
            "msgid": "Please, reload server to apply modifications.",
            "msgstr": "Merci de relancer le serveur pour appliquer les modifications."
        }, {
            "msgid": "File must be in .zip format.",
            "msgstr": "File must be in .zip format."
        },
        "============== ABOUT ==============",
        {
            "msgid": "Server version",
            "msgstr": "Version Serveur"
        }, {
            "msgid": "Web client version",
            "msgstr": "Version Client Web"
        }, {
            "msgid": "Schedule",
            "msgstr": "Horaires"
        }, {
            "msgid": "Phone",
            "msgstr": "Téléphone"
        }, {
            "msgid": "Mail",
            "msgstr": "Email"
        }, {
            "msgid": "Switchboard",
            "msgstr": "Standard"
        }, {
            "msgid": "Tel.",
            "msgstr": "Tel."
        }, {
            "msgid": "Contact us",
            "msgstr": "Nous contacter"
        }, {
            "msgid": "Technical support",
            "msgstr": "Assistance technique"
        }, {
            "msgid": "Download user guide",
            "msgstr": "Télécharger le manuel utilisateur"
        }, {
            "msgid": "Data base version",
            "msgstr": "Version Base de données"
        },
        "============== USER SETTINGS ==============",
        {
            "msgid": "User settings",
            "msgstr": "Préférences utilisateur"
        }, {
            "msgid": "User settings",
            "msgstr": "Préférences",
            "msgctx": "GENERAL_MENU"
        }, {
            "msgid": "Grids configuration",
            "msgstr": "Configuration des grilles"
        }, {
            "msgid": "Replace predefined filters with personalized filters",
            "msgstr": "Remplacer les filtres prédéfinis par des filtres personnalisés"
        }, {
            "msgid": "Replace predefined columns with personalized columns",
            "msgstr": "Remplacer les colonnes prédéfinis par des colonnes personnalisés"
        }, {
            "msgid": "Replace predefined details configuration with personalized configuration",
            "msgstr": "Remplacer les fiches de vie prédéfinies par des fiches personnalisées"
        }, {
            "msgid": "This feature is not available for a super admin user.",
            "msgstr": "Cette fonction n'est pas disponible pour un utilisateur super admin."
        }, {
            "msgid": "Detail configuration",
            "msgstr": "Configuration de la fiche"
        }, {
            "msgid": "Image size",
            "msgstr": "Taille de l'image"
        },
        "============== ACCESS HISTO ==============",
        {
            "msgid": "System type",
            "msgstr": "Type de système"
        },
        "============== MONITORING ==============",
        {
            "msgid": "Telemetry data selection",
            "msgstr": "Sélection de mesure télémétrique"
        }, {
            "msgid": "Edit a sensor",
            "msgstr": "Editer un capteur"
        }, {
            "msgid": "enabled",
            "msgstr": "activé"
        }, {
            "msgid": "sensorType",
            "msgstr": "Type"
        }, {
            "msgid": "value",
            "msgstr": "valeur"
        }, {
            "msgid": "Telemetry management",
            "msgstr": "Télémétrie"
        }, {
            "msgid": "IOT Gateway",
            "msgstr": "Passerelle IOT"
        }, {
            "msgid": "Connectivity",
            "msgstr": "Connectivité"
        }, {
            "msgid": "Gateways",
            "msgstr": "Passerelles"
        }, {
            "msgid": "Sensors",
            "msgstr": "Capteurs"
        }, {
            "msgid": "Sensors management",
            "msgstr": "Gestion des capteurs"
        }, {
            "msgid": "Telemetry",
            "msgstr": "Télémétrie"
        }, {
            "msgid": "Computed",
            "msgstr": "Calculée"
        }, {
            "msgid": "Temperature",
            "msgstr": "Température"
        }, {
            "msgid": "Processor",
            "msgstr": "Processeur"
        }, {
            "msgid": "Connected things",
            "msgstr": "Objets connectés"
        }, {
            "msgid": "Telemetry properties administration",
            "msgstr": "Gestion des propriétés télémétriques"
        }, {
            "msgid": "Computed properties administration",
            "msgstr": "Gestion des propriétés calculées"
        }, {
            "msgid": "Telemetry properties",
            "msgstr": "Propriétés télémétriques"
        }, {
            "msgid": "Computed properties",
            "msgstr": "Propriétés calculées"
        }, {
            "msgid": "Valorization",
            "msgstr": "Valorisation"
        }, {
            "msgid": "Origin",
            "msgstr": "Origine"
        }, {
            "msgid": "Enable/disable",
            "msgstr": "Activer/désactiver"
        }, {
            "msgid": "Select new sensor",
            "msgstr": "Sélection du capteur"
        }, {
            "msgid": "No associated sensor",
            "msgstr": "Pas de capteur associé."
        }, {
            "msgid": "Sensor",
            "msgstr": "Capteur"
        }, {
            "msgid": "Sensor selection",
            "msgstr": "Sélection d'un capteur"
        }, {
            "msgid": "Do you really want to dissociate this sensor ?",
            "msgstr": "Désirez-vous vraiment découpler ce capteur ?"
        }, {
            "msgid": "Select origin",
            "msgstr": "Origine"
        }, {
            "msgid": "Sensor type",
            "msgstr": "Type de capteur"
        }, {
            "msgid": "property",
            "msgstr": "propriété"
        }, {
            "msgid": "Not any",
            "msgstr": "Aucun",
            "msgctx": "masculine"
        }, {
            "msgid": "Not any",
            "msgstr": "Aucune",
            "msgctx": "feminine"
        }, {
            "msgid": "Data input",
            "msgstr": "Saisie de données"
        }, {
            "msgid": "Property source",
            "msgstr": "Propriété source"
        }, {
            "msgid": "Calculated during the display",
            "msgstr": "Calculer lors de l'affichage"
        }, {
            "msgid": "Computed property",
            "msgstr": "Propriété calculée"
        }, {
            "msgid": "Telemetric property",
            "msgstr": "Propriété télémétrique"
        }, {
            "msgid": "Dynamic property",
            "msgstr": "Propriété dynamique"
        }, {
            "msgid": "Not configured.",
            "msgstr": "Non configuré."
        }, {
            "msgid": "Dissociate sensor",
            "msgstr": "Dissocier le capteur"
        }, {
            "msgid": "Sensor information",
            "msgstr": "Info sur le capteur"
        }, {
            "msgid": "Connection type",
            "msgstr": "Type de connexion"
        }, {
            "msgid": "Sensors consultation",
            "msgstr": "Consultation des capteurs"
        }, {
            "msgid": "Sensors administration",
            "msgstr": "Gestion des capteurs"
        }, {
            "msgid": "Create a new sensor",
            "msgstr": "Ajouter un capteur"
        }, {
            "msgid": "Default value",
            "msgstr": "Valeur par défaut"
        }, {
            "msgid": "Recorder",
            "msgstr": "Enregistreur"
        }, {
            "msgid": "Decoder",
            "msgstr": "Decodeur"
        },
        "============== CW ENVIRONMENT CONFIGURATION ==============",
        {
            "msgid": "Environment configuration",
            "msgstr": "Configuration de l'environnement"
        },
        "============== SENSOR TYPES ==============",
        {
            "msgid": "LUMINOSITY",
            "msgstr": "Luminosité"
        }, {
            "msgid": "TEMPERATURE",
            "msgstr": "Température"
        }, {
            "msgid": "GEOLOCALISATION",
            "msgstr": "Géolocalisation"
        }, {
            "msgid": "UNKNOWN",
            "msgstr": "Inconnu"
        }
    ]
});   