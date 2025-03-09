import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generatedBios } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { eq, desc, like, and, count } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur est authentifié
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour accéder à cette ressource" },
        { status: 401 }
      );
    }

    // Récupérer les paramètres de la requête
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("limit") || "10");
    const searchTerm = searchParams.get("q") || "";
    
    // Vérifier les paramètres
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Paramètre 'page' invalide" },
        { status: 400 }
      );
    }
    
    if (isNaN(pageSize) || pageSize < 1 || pageSize > 50) {
      return NextResponse.json(
        { error: "Paramètre 'limit' invalide (1-50)" },
        { status: 400 }
      );
    }

    // Calculer l'offset pour la pagination
    const offset = (page - 1) * pageSize;
    
    // Préparer la condition pour filtrer par utilisateur et recherche
    let conditions = eq(generatedBios.userId, session.user.id);
    if (searchTerm) {
      conditions = and(
        conditions,
        like(generatedBios.content, `%${searchTerm}%`)
      );
    }
    
    // Récupérer les bios de l'utilisateur avec pagination
    const bios = await db
      .select()
      .from(generatedBios)
      .where(conditions)
      .orderBy(desc(generatedBios.createdAt))
      .limit(pageSize)
      .offset(offset);
    
    // Récupérer le nombre total pour la pagination
    const totalCountResult = await db
      .select({ count: count() })
      .from(generatedBios)
      .where(conditions);
      
    const totalCount = totalCountResult[0].count;
    const totalPages = Math.ceil(totalCount / pageSize);
    
    // Retourner les données
    return NextResponse.json({
      bios,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: page,
        pageSize,
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des bios:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des bios" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur est authentifié
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour accéder à cette ressource" },
        { status: 401 }
      );
    }

    // Récupérer l'ID de la bio à supprimer
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "ID de bio manquant" },
        { status: 400 }
      );
    }
    
    // Vérifier que la bio appartient à l'utilisateur
    const bioToDelete = await db
      .select()
      .from(generatedBios)
      .where(
        and(
          eq(generatedBios.id, id),
          eq(generatedBios.userId, session.user.id)
        )
      )
      .limit(1);
      
    if (bioToDelete.length === 0) {
      return NextResponse.json(
        { error: "Bio non trouvée ou vous n'êtes pas autorisé à la supprimer" },
        { status: 403 }
      );
    }
    
    // Supprimer la bio
    await db
      .delete(generatedBios)
      .where(eq(generatedBios.id, id));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de la bio:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression de la bio" },
      { status: 500 }
    );
  }
} 