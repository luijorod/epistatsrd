export function About() {
  return (
    <div className="mx-40 my-10 items-center justify-center">
      <h1 className="text-3xl">Acerca de epistatsrd</h1>
      <br />
      <p>
        Las instituciones públicas generan, recopilan y difunden datos asociados
        con sus funciones institucionales, los cuales son potencialmente
        publicables y de interés para ser usados por la sociedad civil, la
        academia, las empresas, los desarrolladores de software, los medios de
        comunicación y el gobierno. Sin embargo, los datos son creados,
        almacenados y operados por diferentes sistemas de bases datos, muchas
        veces incompatibles entre sí. Además, debido a que las bases de datos
        son consideradas propiedad intelectual de las personas e instituciones
        que las desarrollan, el acceso a los datos está restringido solo a las
        entidades involucradas en su construcción. Estos factores limitan el
        desarrollo de la investigación en las áreas correspondientes. Este
        problema ha sido identificado por los principales gobiernos del mundo y
        ha estimulado la necesidad de poner esta información a disposición del
        público en general.
      </p>
      <br />
      <p>
        Los datos abiertos son datos que pueden ser utilizados, reutilizados y
        redistribuidos libremente por cualquier persona, y que se encuentran
        sujetos, cuando más, al requerimiento de atribución y de compartirse de
        la misma manera en que aparecen. El término abierto se define como un
        formato cuya especificación esté disponible públicamente y de manera
        gratuita, además, para su uso no se deben imponer restricciones de tipo
        monetario u otras. Por ejemplo,{" "}
        <a href="https://es.wikipedia.org/wiki/Valores_separados_por_comas">
          CSV
        </a>{" "}
        y <a href="https://es.wikipedia.org/wiki/JSON">JSON</a> son formatos
        abiertos muy usados para el intercambio de información y la
        interoperabilidad de sistemas.
      </p>
      <br />
      <p>
        A pesar de que en diferentes países existen portales web que permiten
        visualizar de manera intuitiva tendencias de enfermedades de interés
        para la salud pública, en la República Dominicana, a nuestro
        conocimiento, no existe tal herramienta, y el portal
        <a href="https://datos.gob.do"> https://datos.gob.do</a> tiene
        limitaciones importantes. Por otro lado, la Dirección General de
        Epidemiología emite boletines semanales y especiales en formato{" "}
        <a href="https://es.wikipedia.org/wiki/PDF">PDF</a> (un formato no
        estructurado), lo que dificulta su procesamiento en software de análisis
        estadístico, y en consecuencia, el estudio oportuno del comportamiento
        de dichas enfermedades, aumentando la fricción y limitando el desarrollo
        de su investigación.
      </p>
      <br />
      <p>
        Una plataforma intuitiva que agregue los datos de salud pública
        generados por diferentes instituciones del país, y que estos sean de
        calidad, confiables y de libre acceso, y que además permita su
        exportación y visualización de manera interactiva, sería útil para
        investigadores, profesionales de la salud, estudiantes, periodistas, e
        incluso organizaciones sin fines de lucro e instituciones
        gubernamentales. La ausencia de una plataforma que permita la
        visualización y exportación interactiva de datos de las enfermedades
        bajo vigilancia epidemiológica en la República Dominicana nos ha
        motivado a crear <a href="https://epistatsrd.com/">epistatsrd</a>, un
        prototipo que demuestra la factibilidad de una plataforma que cumple con
        las funcionalidades planteadas.
      </p>
    </div>
  );
}
