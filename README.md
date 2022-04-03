# WELUPS Bridge Front End

## Prerequisites

- Install `lerna`

  ```
    npm install --global lerna
  ```

- Clean `lerna`
  ```
    lerna clean
  ```
  
- Install `dependencies`
  ```
    yarn
  ```
  
- Bootstrap `lerna` :
  ```
    lerna bootstrap
  ```

### 1.How to run ?

- Start Web :
  ```
    lerna run web
  ```
- Start Admin :
  ```
    lerna run admin
  ```

### 2. Build Prod ?

- Build Web :

  ```
    lerna run build:web
  ```

- Build Admin :
  ```
    lerna run build:admin
  ```
