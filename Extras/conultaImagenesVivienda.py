import random

def generar_consulta_insert(id_building, url_image):
    return f"INSERT INTO image (id_building, url_image) VALUES ({id_building}, '{url_image}');"


def cargar_links_desde_txt(archivo):

    with open(archivo, 'r') as file:
        return [link.strip() for link in file.readlines()]
    


def generar_imagenes_para_building(id_building, links_disponibles):
    
    cantidad_imagenes = random.randint(3, 10) #num imgenes * vivienda
    return [generar_consulta_insert(id_building, url) for url in random.sample(links_disponibles, cantidad_imagenes)]



def generar_consultas_para_buildings(links_txt):
    consultas = []

    for id_building in range(1, 76):  
        consultas.extend(generar_imagenes_para_building(id_building, links_txt))
    return consultas



def guardar_consultas_en_txt(consultas, archivo_salida):
    with open(archivo_salida, 'w') as file:
        file.write('\n'.join(consultas))







archivo_links = "C:/Users/diego/Desktop/Nombres_imágenes.txt"
archivo_salida = "C:/Users/diego/Desktop/Conulta.txt"

links_txt = cargar_links_desde_txt(archivo_links)
consultas = generar_consultas_para_buildings(links_txt)
guardar_consultas_en_txt(consultas, archivo_salida)


#Explicación

#Genera a partir del nombre de las imagenes de un documento, 
# la conulta par aintroducir el nombre de dicha imagen como url, 
# de forma aleatoria. Como  quería introducir alrededor de 100 viviendas, 
# era demasiado trabajop hacer entre 3 y 10 inserts para cada vivienda y por 
# lo que he hecho este pequeño script que me genera la conulta de forma aleatoria