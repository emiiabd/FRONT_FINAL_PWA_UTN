## Container
son los contenedores

.container, which sets a max-width at each responsive breakpoint
.container-{breakpoint}, which is width: 100% until the specified breakpoint
.container-fluid, which is width: 100% at all breakpoints

                Extra small<576px  Small≥576px  Medium≥768px  Large≥992px  X-Large≥1200px   XX-Large≥1400px
.container	        100%	           540px        720px	    960px	        1140px	        1320px
.container-sm	    100%	           540px        720px	    960px	        1140px	        1320px
.container-md	    100%	           100%	        720px	    960px	        1140px	        1320px
.container-lg	    100%	           100%	        100%	    960px	        1140px	        1320px
.container-xl	    100%	           100%	        100%	    100%	        1140px	        1320px
.container-xxl	    100%	           100%	        100%	    100%	        100%	        1320px
.container-fluid	100%	           100%	        100%	    100%	        100%	        100%


## Columnas
Todas las columnas siempre la suma tiene que dar 12

<div class="container">
  <div class="row">
    <div class="col-4">
      One of two columns
    </div>
    <div class="col-4">
      One of two columns
    </div>
    <!-- <div class="col-4">
      One of two columns
    </div> --> si dejas el espacio vacio, bootstrap va a tomar referencia otra columna-4 que va a ser vacia para completar
</div>

## Breakpoint
sirve para haver el punto de quiebre a la hora de modificar las columnas para celulares, etc

Breakpoint	     Class infix	Dimensions
Extra small	        None	    <576px
Small	              sm	      ≥576px
Medium	            md	      ≥768px
Large	              lg	      ≥992px
Extra large	        xl	      ≥1200px
Extra extra large	  xxl	      ≥1400px