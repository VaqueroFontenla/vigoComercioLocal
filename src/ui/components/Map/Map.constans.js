/******************************************************************
 Define fields
 ******************************************************************/

export const fields = [
  {
    name: "ObjectID",
    alias: "ObjectID",
    type: "oid",
  },
  {
    name: "name",
    alias: "Nombre",
    type: "string",
  },
  {
    name: "description",
    alias: "Descripción",
    type: "string",
  },
  {
    name: "address",
    alias: "Dirección",
    type: "string",
  },
  {
    name: "section",
    alias: "Categoría",
    type: "string",
  },
  {
    name: "phone",
    alias: "Telefono",
    type: "string",
  },
  {
    name: "web",
    alias: "Web",
    type: "string",
  },
];

/******************************************************************
Define symbols for each unique type. 
******************************************************************/

export const FashionSym = {
  type: "simple-marker",
  size: 10,
  color: "black",
  outline: {
    width: 0.5,
    color: "white",
  },
};

export const BooksSym = {
  type: "simple-marker",
  size: 10,
  color: "green",
  outline: {
    width: 0.5,
    color: "white",
  },
};

export const RecordsSym = {
  type: "simple-marker", 
  size: 10,
  color: "red",
  outline: {
    width: 0.5,
    color: "white",
  },
};

export const TatoosSym = {
  type: "simple-marker",
  size: 10,
  color: "purple",
  outline: {
    width: 0.5,
    color: "white",
  },
};

export const PresentSym = {
  type: "simple-marker",
  size: 10,
  color: "yellow",
  outline: {
    width: 0.5,
    color: "white",
  },
};
