import PDFDocument from 'pdfkit'; 
import fs from 'fs'; 

class FacturaManager {
    constructor(Producto, Factura) {
        this.Producto = Producto; 
        this.Factura = Factura; 
    }

    async validarStock(productos) {
        for (const producto of productos) {
            const productoDB = await this.Producto.findById(producto.id); 
            if (!productoDB) {
                return `El producto ${producto.nombre} no existe.`;
            }
            if (productoDB.stock < producto.cantidad) {
                return `No hay suficiente stock para el producto ${producto.nombre}.`;
            }
        }
        return null;
    }

    calcularTotal(productos) {
        let total = 0;
        productos.forEach((producto) => {
            total += producto.cantidad * producto.precio;
        });
        return total;
    }

    generarFacturaPDF(factura) {
        const doc = new PDFDocument();

        // Ruta donde guardara el PDF generado
        const archivoPdfPath = `./public/pdfs/factura_${factura.id}.pdf`;

        // Crear un archivo PDF
        doc.pipe(fs.createWriteStream(archivoPdfPath));

        // Título de la factura
        doc.fontSize(18).text(`Factura #${factura.id}`, { align: 'center' });

        // Información del cliente
        doc.fontSize(12)
           .text(`Cliente: ${factura.usuario.nombre}`, { align: 'left' })
           .text(`Fecha: ${factura.fecha}`, { align: 'left' });

        doc.moveDown();

        doc.text('Productos:', { underline: true });
        doc.moveDown();
        doc.text('---------------------------------------------------------------');

        factura.productos.forEach((producto, index) => {
            doc.text(`${producto.nombre} | Cantidad: ${producto.cantidad} | Precio Unitario: $${producto.precio} | Total: $${(producto.cantidad * producto.precio).toFixed(2)}`);
        });

        doc.moveDown();
        doc.text(`---------------------------------------------------------------`);
        doc.fontSize(14).text(`Total: $${factura.total.toFixed(2)}`, { align: 'right' });

        doc.end();

        return archivoPdfPath;
    }

    async crearFactura(usuario, productos) {
        try {
            // Validar stock antes de proceder
            const errorStock = await this.validarStock(productos);
            if (errorStock) {
                throw new Error(errorStock);
            }
            const totalFactura = this.calcularTotal(productos);

            const factura = new this.Factura({
                usuario: usuario,
                productos: productos,
                total: totalFactura,
                fecha: new Date().toISOString(),
            });

            await factura.save();

            const archivoPdf = this.generarFacturaPDF(factura);

            return {
                message: 'Factura creada con éxito',
                archivoPdf: archivoPdf,
            };
        } catch (error) {
            throw new Error(`Error al crear la factura: ${error.message}`);
        }
    }
}

export default FacturaManager;
